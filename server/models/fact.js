'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Fact.hasOne(models.Recipe, { foreignKey: "factId" })
    }
  }
  Fact.init({
    calcium: DataTypes.STRING,
    calories: DataTypes.STRING,
    carbohydrate: DataTypes.STRING,
    cholesterol: DataTypes.STRING,
    fat: DataTypes.STRING,
    fiber: DataTypes.STRING,
    iron: DataTypes.STRING,
    monounsaturated_fat: DataTypes.STRING,
    polyunsaturated_fat: DataTypes.STRING,
    potassium: DataTypes.STRING,
    protein: DataTypes.STRING,
    saturated_fat: DataTypes.STRING,
    serving_size: DataTypes.STRING,
    sodium: DataTypes.STRING,
    sugar: DataTypes.STRING,
    trans_fat: DataTypes.STRING,
    vitamin_a: DataTypes.STRING,
    vitamin_c: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Fact',
  });
  return Fact;
};