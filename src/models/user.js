// Dependencies
import Moniker from 'moniker';

// Types
import {userRoles} from '../types/user';
import sequelize from "sequelize";
import {transferStates} from "../types/transfer";

const user = (sequelize, DataTypes) => {
  // Model Architecture
  const User = sequelize.define('user', {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: [
        userRoles.USER,
        userRoles.PARTNER,
        userRoles.STUDIO,
        userRoles.ADMINISTRATOR,
      ],
      defaultValue: userRoles.USER,
    },
  });

  // Association
  User.associate = models => {
    User.hasMany(models.NFT, {
      foreignKey: 'creatorId',
      as: 'nfts',
    });
  };

  User.addHook('beforeCreate', (user, options) => {
    user.username = Moniker.choose();
  });

  // Functions
  User.findById = async (id) => {
    return User.findOne({
      where: {
        id,
      },
    });
  }

  User.findByWallet = async (wallet) => {
    return User.findOne({
      where: {
        address: wallet,
      }
    })
  }

  return User;
}

export const getAvailableNFTs = async (models, userId, nftId, projectId) => {

  console.log({userId})

  // Get Transactions
  let received = await models.Transfer.findAll({
    attributes: [
      [sequelize.fn('sum', sequelize.col('quantity')), 'received'],
    ],
    where: {
      to: userId,
      nftId,
      projectId,
    },
    raw: true
  });

  let sent = await models.Transfer.findAll({
    attributes: [
      [sequelize.fn('sum', sequelize.col('quantity')), 'sent'],
    ],
    where: {
      from: userId,
      nftId,
      projectId
    },
    raw: true
  });

  [{sent}] = sent;
  [{received}] = received;

  sent = sent ? sent : 0;
  received = received ? received : 0;

  sent = parseInt(sent, 0) ?? 0;
  received = parseInt(received, 0) ?? 0;

  let acquired = received - sent;

  // Get Actions
  let offers = await models.Action.findAll({
    attributes: [
      [sequelize.fn('sum', sequelize.col('quantity')), 'offers'],
    ],
    where: {
      state: transferStates.ACTIVE,
      userId: userId,
      nftId: nftId,
      projectId: projectId,
    },
    raw: true
  }) ?? 0;

  [{offers}] = offers;

  offers = offers ? offers : 0;
  offers = parseInt(offers, 0) ?? 0;

  acquired = acquired - offers;

  return Number(acquired);
}

export default user;

