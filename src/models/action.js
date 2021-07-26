import {currencyTypes, transferStates, transferTypes} from "../types/transfer";

const action = (sequelize, DataTypes) => {
  // Model Architecture
  const Action = sequelize.define('action', {
    state: {
      type: DataTypes.ENUM,
      values: [
        transferStates.ACTIVE,
        transferStates.INACTIVE
      ],
      defaultValue: transferStates.ACTIVE,
    },
    type: {
      type: DataTypes.ENUM,
      values: [
        transferTypes.BUY,
        transferTypes.SELL,
        transferTypes.RENT,
        transferTypes.TRADE,
      ],
      allowNull: false,
    },
    nftId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.ENUM,
      values: [
        currencyTypes.BLZT,
        currencyTypes.DAI,
        currencyTypes.ETH,
        currencyTypes.USDT,
      ],
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    signature: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Association
  Action.associate = models => {
    Action.belongsTo(models.NFT, {
      foreignKey: 'nftId',
      as: 'nft',
    });

    Action.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project',
    });

    Action.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };


  // Functions
  Action.findById = async (id) => {
    return Action.findOne({
      where: {
        id,
      },
    });
  }

  Action.findByIdAndType = async (id, type) => {
    return Action.findAll({
      where: {
        id,
        type,
      }
    })
  }

  return Action;
}

export default action;