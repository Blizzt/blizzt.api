export default {
  Query: {
    categories: async (parent, {
      type = null,
    }, {models}) => {
      return models.Category.findAll({
        where: type ? {
          type
        } : {},
        order: [
          ['id', 'ASC'],
        ],
      });
    },
    category: async (parent, {
      id,
    }, {models}) => models.Category.findById(id)
  },
};
