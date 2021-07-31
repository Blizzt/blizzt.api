import {offerStatesId, currencyTypesId} from '../types/transfer';

const rent = (sequelize, DataTypes) => {
  // Model Architecture
  const Rent = sequelize.define('rent', {
    state: {
      type: DataTypes.ENUM,
      values: [
        offerStatesId.ACTIVE,
        offerStatesId.INACTIVE,
      ],
      defaultValue: offerStatesId.ACTIVE,
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
    offerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    until: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
  });

  // Association
  Rent.associate = models => {
    Rent.belongsTo(models.NFT, {
      foreignKey: 'nftId',
      as: 'nft',
    });

    Rent.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project',
    });

    Rent.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    Rent.belongsTo(models.Offer, {
      foreignKey: 'offerId',
      as: 'offer',
    });
  };

  // Functions
  Rent.findById = async (id) => {
    return Rent.findOne({
      where: {
        id,
      },
    });
  }

  Rent.edit = async (id, data = {}) => {
    const offer = await Rent.update(data, {
      where: {
        id,
      },
      returning: true,
      plain: true,
    })
    return offer[1];
  };

  return Rent;
}

export default rent;
