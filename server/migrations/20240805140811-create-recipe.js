'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      grams_per_portion: {
        type: Sequelize.STRING
      },
      number_of_servings: {
        type: Sequelize.STRING
      },
      ingredient: {
        type: DataTypes.JSON
      },
      direction: {
        type: DataTypes.JSON
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      factId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "Facts",
          },
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recipes');
  }
};