'use strict';

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
   return queryInterface.bulkInsert('Items', [{
    name: 'Ripped Cardboard',
    type: "sheild",
    power: 8,
    trait: 60,
    price: 200,
    minLevel: 1,
    img: "/images/cardboard1.png",
    createdAt : new Date,
    updatedAt: new Date
  },{
    name: 'Kithcen Knife',
    type: "weapon",
    power: 6,
    trait: 60,
    price: 200,
    minLevel: 1,
    img: "/images/kitchenKnife.png",
    createdAt : new Date,
    updatedAt: new Date
  },{
    name: 'Glock 17',
    type: "weapon",
    power: 12,
    trait: 50,
    price: 450,
    minLevel: 3,
    img: "/images/glock17.png",
    createdAt : new Date,
    updatedAt: new Date
  }
], {});
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
