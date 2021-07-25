// Utils
import {nftTypes} from "../types/nft";
import {ApolloError} from "apollo-server-express";
import {operationTypes} from "../types/operation";

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
     */
    mintNFT: async(
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
  },

  NFT: {
    creator: async (nft, args, {models}) => {
      return models.User.findById(nft.ownerId);
    },
    project: async (nft, args, {models}) => {
      return models.Project.findById(nft.projectId);
    },
    forRent: async (nft, args,  {models}) => {
      return models.Operation.findByIdAndType(nft.id, operationTypes.RENT);
    },
    forSale: async (nft, args,  {models}) => {
      return models.Operation.findByIdAndType(nft.id, operationTypes.SELL);
    },
  },
};
