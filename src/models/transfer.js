import {currencyTypes, transferTypes} from "../types/transfer";

const transfer = (sequelize, DataTypes) => {
  // Model Architecture
  const Transfer = sequelize.define('transfer', {
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
  Transfer.associate = models => {
    Transfer.belongsTo(models.NFT, {
      foreignKey: 'nftId',
      as: 'nft',
    });
  };


  // Functions
  Transfer.findById = async (id) => {
    return Transfer.findOne({
      where: {
        id,
      },
    });
  }

  Transfer.findByIdAndType = async (id, type) => {
    return Transfer.findAll({
      where: {
        id,
        type,
      }
    })
  }

  return Transfer;
}

export default transfer;
