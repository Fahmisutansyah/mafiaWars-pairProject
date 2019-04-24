'use strict';
const faker = require('faker')
const basePrice = 50

const generate = size => Array.from(Array(size), (o_o,i) => ({
  name: `${faker.name.firstName()}-building`,  
  price: (((i%50)+1)*basePrice) + ((i%50)+1) * (~~(Math.random()*(basePrice+100))+basePrice),  
  img: null,
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
   return queryInterface.bulkInsert('Properties', generate(100), {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Properties', null, {});
  }
};
