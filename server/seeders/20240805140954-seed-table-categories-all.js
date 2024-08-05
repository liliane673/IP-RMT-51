'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require('../db/categories.json').map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el
    })
    await queryInterface.bulkInsert('Categories', data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true
    });
  }
};
