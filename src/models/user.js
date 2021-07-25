// Dependencies
import Moniker from 'moniker';

// Types
import {userRoles} from '../types/user';

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
  User.associate = models => {};

  User.beforeCreate = (user) => {
    console.log('Insert: ', user);
  }

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

export default user;
