import {nftTypes} from "../types/nft";
import Transfer from '../models/transfer';

const nft = (sequelize, DataTypes) => {
  // Model Architecture
  const NFT = sequelize.define('nft', {
    type: {
      type: DataTypes.ENUM,
      values: [
        nftTypes.OBJECT,
        nftTypes.CHROME,
      ],
      defaultValue: nftTypes.OBJECT,
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    nftId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    IPFSAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    metadata: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    mintedAmount: {
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: true,
  });

  // Association
  NFT.associate = models => {

    NFT.belongsTo(models.User, {
      foreignKey: 'creatorId',
      as: 'creator',
    });

    NFT.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project',
    });
  };

  // Functions
  NFT.exists = async (nftId, projectId) => {
    return NFT.findOne({
      where: {
        nftId,
        projectId
      },
    });
  }

  return NFT;
}

export default nft;
