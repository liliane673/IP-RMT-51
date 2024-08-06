'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword, comparePassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Recipe, { foreignKey: "authorId" })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email already exists"
      },
      validate: {
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email is required" },
        isEmail: { msg: "Email must be in format email" },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password is required" },
        notEmpty: { msg: "Password is required" },
        len: { args: [5], msg: "Password min 5 characters" },
      }
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance) => {
    instance.password = hashPassword(instance.password);
  })
  return User;
};