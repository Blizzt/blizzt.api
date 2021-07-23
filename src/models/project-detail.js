const projectDetail = (sequelize, DataTypes) => {
  // Model Architecture
  const ProjectDetail = sequelize.define('project-detail', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    web: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    steam: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    xbox: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    playstation: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    android: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    ios: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    kickstarter: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    youtube: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    twitch: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    vk: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    discord: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    reddit: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    telegram: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    }
  });

  // Association
  ProjectDetail.associate = models => {
    ProjectDetail.belongsTo(models.Project, {
      foreignKey: 'id',
      as: 'project',
    });
  };

  // Functions
  ProjectDetail.findById = async (id) => {
    return ProjectDetail.findOne({
      where: {
        id,
      },
    });
  }

  ProjectDetail.edit = async (id, data = {}) => {
    const project = await ProjectDetail.update(data, {
      where: {
        id,
      },
      returning: true,
      plain: true,
    })
    return project[1];
  };


  return ProjectDetail;
}

export default projectDetail;
