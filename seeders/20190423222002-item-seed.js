'use strict';
const faker = require('faker')

// const generate = {}
const basePrice=200
const basePower=5


const generate = size => Array.from(Array(size), (o_o,i) => ({
  name: `item-${faker.name.firstName()}-${~~((Math.random())*50)}`,
  type: ['weapon','shield'][~~(Math.random()*2)],
  price: (((i%50)+1)*basePrice) + ((i%50)+1) * (~~(Math.random()*(basePrice+100))+basePrice),
  minLevel: (i%50)+1,
  power: ((i%50)+1)+(basePower)+(~~(Math.random()*((i%50)+1))),
  img: null,
  trait: 90 - ((i%50)+(~~(Math.random()*45))), 
  createdAt: new Date,
  updatedAt: new Date
}))

console.log(generate(5))

// console.log(generate(8))
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
    //  name: DataTypes.STRING,
    // type: DataTypes.STRING,
    // power: DataTypes.INTEGER,
    // price: DataTypes.INTEGER,
    // minLevel: DataTypes.INTEGER,
    // img: DataTypes.STRING
    



    return queryInterface.bulkInsert('Items', generate(150), {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Items', null, {});
  }
};
