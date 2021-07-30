// Dependencies
import sequelize from 'sequelize';
import {ApolloError} from "apollo-server-express";

// Types
import {nftTypes} from "../types/nft";
import {actionTypes} from "../types/transfer";
import {getAvailableNFTs} from "../models/user";

export default {
  Query: {
    nft: async (parent, {projectId, nftId}, {models}) => {
      return models.NFT.findOne({
        where: {
          projectId,
          nftId,
        }
      });
    },
    nfts: async (parent, args, {models}) => {
      return models.NFT.findAll();
    }
  },
  Mutation: {
    /**
     * @function mintNFT():
     * @description Controller in charge of minting an NFT in the database.
     * @param parent Contextual Info
     * @param type Type of NFT. (nftTypes)
     * @param projectId Id of the project associated with the NFT.
     * @param nftId Id of the NFT within the blockchain
     * @param collectionAddress Blockchain collection id
     * @param metadata Metadata for off-chain caching
     * @param IPFSAddress IPFS address to collect data on the blockchain.
     * @param amount Amount of NFT to mint
     * @param models Total models in architecture
     * @param me Authenticated user making the call
     * @returns {Promise<ApolloError|*>}
     */
    mintNFT: async (
      parent, {
        type = nftTypes.OBJECT,
        projectId,
        nftId,
        collectionAddress,
        metadata,
        IPFSAddress,
        amount,
      },
      {models, me},
    ) => {
      const isTheOwnerOfTheProject = await models.Project.findByIdAndOwner(projectId, me.id);

      if (!isTheOwnerOfTheProject) {
        return new ApolloError('Only the project owner can mint NFTS', '20001');
      }

      // We detect if the NFT exists.
      const nftExists = await models.NFT.exists(nftId, projectId);

      if (nftExists) {
        return new ApolloError('This NFT already exists', '20000')
      }

      // Edit Project with Collection Address
      await models.Project.edit(projectId, {
        collectionAddress
      });

      // We create the project and return it to the client.
      const nft = await models.NFT.create({
        nftId,
        metadata,
        projectId,
        IPFSAddress,
        creatorId: me.id,
        mintedAmount: amount,
        type: nftTypes.OBJECT,
      });

      if (nft) {
        await models.Transfer.sendTo(nft.nftId, null, nft.creatorId, nft.mintedAmount);
      }
    },

    sellNFT: async (
      parent, {
        nftId,
        projectId,
        amount,
        price,
        isBundlePack,
        currency,
        message,
        signature,
      },
      {models, me},
    ) => {
      // Get the current project.
      const project = await models.NFT.exists(nftId, projectId);
      if (!project) {
        return new ApolloError(`No existe el proyecto ID ${projectId}`, '20000');
      }

      // Get the NFT in the database
      const nft = await models.NFT.exists(nftId, projectId);
      if (!nft) {
        return new ApolloError(`Este proyecto no tiene un NFT id ${nftId}`, '20000')
      }

      const nftAvailable = await getAvailableNFTs(models, me.id, nftId, projectId);

      if (amount > nftAvailable) {
        return new ApolloError(`No tienes suficientes NFTS para vender, actualmente tienes ${nftAvailable}`, '20000');
      }

      return models.Action.create({
        type: actionTypes.SELL,
        nftId,
        projectId,
        userId: me.id,
        quantity: amount,
        price,
        currency,
        message,
        signature
      });
    },
  },

  NFT: {
    project: async (nft, args, {models}) => {
      return models.Project.findById(nft.projectId);
    },

    forRent: async (nft, args,  {models}) => {
      return models.Action.searchAvailable(nft.nftId, nft.projectId, actionTypes.RENT);
    },

    forSale: async (nft, args,  {models}) => {
      return models.Action.searchAvailable(nft.nftId, nft.projectId, actionTypes.SELL);
    },

    acquired: async (nft, args,  {models, me}) => {
      return getAvailableNFTs(models, me.id, nft.nftId, nft.projectId);
    },
  },
};
