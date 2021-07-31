export default {
  Query: {
    currencies: async (parent, args, {models}) => {
      return models.Currency.findAll();
    },
    currency: async (parent, {
      id,
    }, {models}) => models.Currency.findById(id),
  },
};

