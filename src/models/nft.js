import {nftTypes} from "../types/nft";

const nft = (sequelize, DataTypes) => {
  // Model Architecture
  const NFT = sequelize.define('nft', {
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: [
        nftTypes.OBJECT,
        nftTypes.CHROME,
      ],
      defaultValue: nftTypes.OBJECT,
    },
    nftId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    collectionAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IPFSAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    metadata: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: true,
  });

  // Association
  NFT.associate = models => {
    NFT.belongsTo(models.User, {
      foreignKey: 'ownerId',
      as: 'owner',
    });
    NFT.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project',
    });
  };

  return NFT;
}

export default nft;
