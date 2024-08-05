'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipe.hasOne(models.Fact)
      Recipe.belongsTo(models.User, { foreignKey: "authorId" })
      Recipe.belongsTo(models.Category, { foreignKey: "categoryId" })
      Recipe.belongsTo(models.Type, { foreignKey: "typeId" })
    }
  }
  Recipe.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Title is required" },
        notEmpty: { msg: "Title is required" },
      }
    },
    cookingTime: DataTypes.INTEGER,
    ingredient: DataTypes.STRING,
    direction: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    categoryId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};