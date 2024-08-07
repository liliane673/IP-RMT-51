'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MySavedRecipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MySavedRecipe.belongsTo(models.Recipe, { foreignKey: "recipeId" })
      MySavedRecipe.belongsTo(models.User, { foreignKey: "userId" })
    }
  }
  MySavedRecipe.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "Users",
        },
        key: "id"
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "Recipes",
        },
        key: "id"
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'MySavedRecipe',
  });
  return MySavedRecipe;
};