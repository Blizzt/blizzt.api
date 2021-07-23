// Utils
import {nftTypes} from "../types/nft";

export default {
  Query: {
    nft: async (parent, {collectionAddress, nftId}, {models}) => {
      return models.NFT.findOne({
        where: {
          nftId,
          collectionAddress
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
        projectId,
        type = nftTypes.OBJECT,
        nftId,
        collectionAddress,
        metadata,
        IPFSAddress,
        amount,
      },
      {models, me},
    ) => {
      // TODO: Minting process here.

      return {}
    },
  },

  NFT: {
    creator: async (nft, args, {models}) => {
      return models.User.findById(nft.ownerId);
    },
    project: async (nft, args, {models}) => {
      return models.Project.findAll(nft.projectId);
    },
  },
};
