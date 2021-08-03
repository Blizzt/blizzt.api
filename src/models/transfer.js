const transfer = (sequelize, DataTypes) => {
  // Model Architecture
  const Transfer = sequelize.define('transfer', {
    nftId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    from: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    to: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // Association
  Transfer.associate = models => {
    Transfer.belongsTo(models.NFT, {
      foreignKey: 'nftId',
      as: 'nft',
    });

    Transfer.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project',
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

  Transfer.sendTo = async (nftId, projectId, from, to, price = 0, quantity) => {
    return Transfer.create({
      nftId,
      projectId,
      from,
      to,
      price,
      quantity,
    });
  }

  Transfer.findByIdAndType = async (id, type) => {
    return Transfer.findAll({
      where: {
        id,
        type,
      },
    })
  }

  return Transfer;
}

export default transfer;
