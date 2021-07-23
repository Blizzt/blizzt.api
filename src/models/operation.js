import {currencyTypes, operationTypes} from "../types/operation";

const operation = (sequelize, DataTypes) => {
  // Model Architecture
  const Operation = sequelize.define('operation', {
    type: {
      type: DataTypes.ENUM,
      values: [
        operationTypes.BUY,
        operationTypes.SELL,
        operationTypes.RENT,
        operationTypes.TRADE,
      ],
      allowNull: false,
    },
    refId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
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
    }
  });

  // Association
  Operation.associate = models => {
    Operation.belongsTo(models.NFT, {
      foreignKey: 'refId',
      as: 'nft',
    });
  };


  // Functions
  Operation.findById = async (id) => {
    return Operation.findOne({
      where: {
        id,
      },
    });
  }


  return Operation;
}

export default operation;
