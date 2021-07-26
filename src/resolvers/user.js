// Utils
import {createToken} from "../utils/auth/token";

export default {
  Query: {
    me: async (parent, args, {models, me}) => {
      if (!me) {
        return null;
      }
      return await models.User.findById(me.id);
    },
  },
  Mutation: {
    /**
     * @function obtainUserFromWallet():
     */
    obtainUserFromWallet: async(
      parent,
      {wallet},
      {models, me, secret},
) => {
  const getUserTOKEN = async (user = {}) =>
    await createToken(user.toJSON(), secret, '90d');

  // 1. If user exists, login!
  const userOnDatabase = await models.User.findByWallet(wallet);

  if (userOnDatabase) {
    const token = getUserTOKEN(userOnDatabase);
    return {
      token,
      user: userOnDatabase,
    }
  }

  // If not, register on DB and create identity token.
  const user = await models.User.create({
    address: wallet
  });

  const token = getUserTOKEN(user);
      return {
        token,
        user,
      }
    },
  },

  User: {
    projects: async (user, args, {models}) => {
      return models.Project.findAll({
        where: {
          ownerId: user.id,
        },
      });
    },

    inventory: async (user, args, {models}) => {
      const inventory = await models.NFT.findAndCountAll({
        where: {
          ownerId: user.id,
        },
      });

      return {
        amount: inventory.count,
        items: inventory.rows,
      }
    },

  },
};
