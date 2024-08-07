'use strict';

const bcrypt = require('bcryptjs');
const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require('../db/users.json').map((el) => {
      delete el.id;
      el.password = hashPassword(el.password);
      el.createdAt = el.updatedAt = new Date();
      return el
    })
    await queryInterface.bulkInsert('Users', data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true
    });
  }
};
