export default {
  Query: {
    offer: async (parent, {
      id,
    }, {models}) => models.Offer.findById(id),
  },

  Offer: {
    nft: async (action, args, {models}) => {
      return models.NFT.findOne({
        where: {
          projectId: action.projectId,
          nftId: action.nftId,
        },
      })
    },

    project: async (action, args, {models}) => {
      return models.Project.findOne({
        where: {
          id: action.projectId,
        },
      })
    },

    user: async (action, args, {models}) => {
      return models.User.findOne({
        where: {
          id: action.userId,
        },
      })
    },
  },
};

