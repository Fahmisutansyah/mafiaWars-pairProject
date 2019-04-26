'use strict';
const fake = require('faker')
const bcrypt= require('bcrypt')

const generate = size => Array.from(Array(size), (o_o,i) => ({
  username: fake.internet.userName(),
  password: bcrypt.hashSync('123456', 5),
  experience: 0,
  level: (i%50) + 1,
  energy: 0,
  money: 0,
  email: fake.internet.email(),
  image: '/images/default.png',
  createdAt: new Date,
  updatedAt: new Date
}))

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Players', generate(55), {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
