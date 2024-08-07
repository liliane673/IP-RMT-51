'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Facts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      carbohydrate: {
        type: Sequelize.STRING
      },
      calcium: {
        type: Sequelize.STRING
      },
      calories: {
        type: Sequelize.STRING
      },
      cholesterol: {
        type: Sequelize.STRING
      },
      fat: {
        type: Sequelize.STRING
      },
      fiber: {
        type: Sequelize.STRING
      },
      iron: {
        type: Sequelize.STRING
      },
      monounsaturated_fat: {
        type: Sequelize.STRING
      },
      polyunsaturated_fat: {
        type: Sequelize.STRING
      },
      potassium: {
        type: Sequelize.STRING
      },
      protein: {
        type: Sequelize.STRING
      },
      saturated_fat: {
        type: Sequelize.STRING
      },
      serving_size: {
        type: Sequelize.STRING
      },
      sodium: {
        type: Sequelize.STRING
      },
      sugar: {
        type: Sequelize.STRING
      },
      trans_fat: {
        type: Sequelize.STRING
      },
      vitamin_a: {
        type: Sequelize.STRING
      },
      vitamin_c: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Facts', {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  }
};