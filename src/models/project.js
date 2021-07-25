import {markdownDefault, projectTypes, sectorTypes} from "../types/project";

const project = (sequelize, DataTypes) => {
  // Model Architecture
  const Project = sequelize.define('project', {
    id: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    chainId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    collectionAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    section: {
      type: DataTypes.ENUM,
      values: [
        sectorTypes.GAME,
        sectorTypes.SONG,
        sectorTypes.MOVIE,
      ],
      allowNull: false,
      defaultValue: sectorTypes.GAME,
    },
    status: {
      type: DataTypes.ENUM,
      values: [
        projectTypes.CAMPAIGN,
        projectTypes.PRODUCT
      ],
      allowNull: false,
      defaultValue: projectTypes.CAMPAIGN,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 128,
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 300,
      }
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    document: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
      defaultValue: markdownDefault,
    },
  });

  // Association
  Project.associate = models => {
    Project.belongsTo(models.User, {
      foreignKey: 'ownerId',
      as: 'creator',
    });
    Project.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });
    Project.hasMany(models.NFT, {
      foreignKey: 'projectId',
      as: 'nfts',
    });
  };

  // Functions
  Project.findById = async (id) => {
    return Project.findOne({
      where: {
        id,
      },
    });
  };

  Project.findByIdAndOwner = async (id, ownerId) => {
    return Project.findOne({
      where: {
        id,
        ownerId,
      }
    });
  };

  Project.edit = async (id, data = {}) => {
    const project = await Project.update(data, {
      where: {
        id,
      },
      returning: true,
      plain: true,
    })
    return project[1];
  };

  return Project;
}

export default project;
