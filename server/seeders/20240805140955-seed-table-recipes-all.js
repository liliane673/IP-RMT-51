'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require('../db/recipes.json').map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el
    })
    // console.log(data);
    await queryInterface.bulkInsert('Recipes', data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recipes', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true
    });
  }
};
