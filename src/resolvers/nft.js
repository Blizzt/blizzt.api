// Dependencies
import {ApolloError} from "apollo-server-express";

// Utils
import {nftTypes} from "../types/nft";
import {transferTypes} from "../types/transfer";

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
      return await models.NFT.create({
        ownerId: me.id,
        projectId,
        type: nftTypes.OBJECT,
        nftId,
        IPFSAddress,
        metadata,
        amount,
      });
    },

    sellNFT: async (
      parent, {
        nftId,
        collectionAddress,
        projectId,
        amount,
        price,
        isBundlePack,
        currency,
        message,
        signature
      },
      {models, me},
    ) => {


    },
  },

  NFT: {
    project: async (nft, args, {models}) => {
      return models.Project.findById(nft.projectId);
    },
    forRent: async (nft, args,  {models}) => {
      return models.Action.findByIdAndType(nft.id, transferTypes.RENT);
    },
    forSale: async (nft, args,  {models}) => {
      return models.Action.findByIdAndType(nft.id, transferTypes.SELL);
    },
    acquired: async (nft, args,  {models, me}) => {
      return nft.amount;
    },
  },
};
