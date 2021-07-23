import {categoryTypes} from "../types/category";

const category = (sequelize, DataTypes) => {
  // Model Architecture
  const Category = sequelize.define('category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: [
        categoryTypes.GAME,
        categoryTypes.MOVIE,
        categoryTypes.SONG,
        categoryTypes.SOFTWARE
      ],
      defaultValue: categoryTypes.GAME,
    },
  });

  // Association
  Category.associate = models => {};

  // Functions
  Category.findById = async (id) => {
    return Category.findOne({
      where: {
        id,
      },
    });
  }


  return Category;
}

export default category;
