import {offerStatesId, offerTypesId, currencyTypesId} from '../types/transfer';

const offer = (sequelize, DataTypes) => {
  // Model Architecture
  const Offer = sequelize.define('offer', {
    state: {
      type: DataTypes.ENUM,
      values: [
        offerStatesId.ACTIVE,
        offerStatesId.INACTIVE,
      ],
      defaultValue: offerStatesId.ACTIVE,
    },
    type: {
      type: DataTypes.ENUM,
      values: [
        offerTypesId.BUY,
        offerTypesId.SELL,
        offerTypesId.RENT,
        offerTypesId.TRADE,
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
      allowNull: false,
    },
    isBundlePack: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.ENUM,
      values: [
        currencyTypesId.BLZT,
        currencyTypesId.DAI,
        currencyTypesId.ETH,
        currencyTypesId.USDT,
      ],
    },
    maxExpirationDate: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    fingerprint: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
  });

  // Association
  Offer.associate = models => {
    Offer.hasMany(models.Transfer);

    Offer.belongsTo(models.NFT, {
      foreignKey: 'nftId',
      as: 'nft',
    });

    Offer.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project',
    });

    Offer.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };


  // Functions
  Offer.findById = async (id) => {
    return Offer.findOne({
      where: {
        id,
      },
    });
  }

  Offer.searchAvailable = async (nftId, projectId, type) => {
    return Offer.findAll({
      where: {
        type,
        nftId,
        projectId,
      },
    })
  }

  Offer.edit = async (id, data = {}) => {
    const offer = await Offer.update(data, {
      where: {
        id,
      },
      returning: true,
      plain: true,
    })
    return offer[1];
  };

  return Offer;
}

export default offer;
