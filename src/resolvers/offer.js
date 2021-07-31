export default {
  Query: {
    offer: async (parent, {
      id,
    }, {models}) => models.Offer.findById(id),
  },

  Offer: {
    fiat: async ({currencyId, price}, args, {models}) => {
      const {
        usd,
        eur,
        aed,
        cny,
        jpy,
        rub,
        gbp,
      } = await models.Currency.findById(currencyId);
      const currencies = {usd, eur, aed, cny, jpy, rub, gbp};
      return Object.keys(currencies).reduce((acc, key) => {
        return {
          ...acc,
          [key]: (price * currencies[key]).toFixed(2),
        }
      }, {});
    },

    nft: async (offer, args, {models}) => {
      return models.NFT.findOne({
        where: {
          projectId: offer.projectId,
          nftId: offer.nftId,
        },
      })
    },

    currency: async (offer, args, {models}) => {
      return models.Currency.findOne({
        where: {
          id: offer.currencyId,
        },
      })
    },

    project: async (offer, args, {models}) => {
      return models.Project.findOne({
        where: {
          id: offer.projectId,
        },
      })
    },

    user: async (offer, args, {models}) => {
      return models.User.findOne({
        where: {
          id: offer.userId,
        },
      })
    },
  },
};

