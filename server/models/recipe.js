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
      Recipe.belongsTo(models.Fact, { foreignKey: "factId" })
      Recipe.hasMany(models.MySavedRecipe, { foreignKey: "recipeId" })
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
    grams_per_portion: DataTypes.STRING,
    number_of_servings: DataTypes.INTEGER,
    ingredient: DataTypes.JSON,
    direction: DataTypes.JSON,
    imgUrl: DataTypes.STRING,
    category: DataTypes.STRING,
    type: DataTypes.STRING,
    factId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};