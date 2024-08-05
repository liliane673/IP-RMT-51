'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require('../db/facts.json').map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el
    })
    // console.log(data);
    await queryInterface.bulkInsert('Facts', data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Facts', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true
    });
  }
};
