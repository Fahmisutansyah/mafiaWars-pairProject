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
    let list = [
      {
        name: "Brass Knuckle",
        type: "weapon",
        power: 8,
        trait: 59,
        price: 400,
        minLevel: 3,
        img: "/images/brassKnuckle.png",
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: "Baton",
        type: "weapon",
        power: 11,
        trait: 70,
        price: 420,
        minLevel: 2,
        img: "/images/baton.png",
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: "Amazon Prime Box",
        type: "shield",
        power: 15,
        trait: 82,
        price: 1000,
        minLevel: 5,
        img: "/images/amazon.png",
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: "Light Kevlar",
        type: "shield",
        power: 24,
        trait: 70,
        price: 3500,
        minLevel: 9,
        img: "/images/lightKevlar.png",
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: "FN Five Seven",
        type: "weapon",
        power: 15,
        trait: 59,
        price: 1500,
        minLevel: 6,
        img: "/images/FNFiveSeven.png",
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: "FN Five Seven 2.0",
        type: "weapon",
        power: 19,
        trait: 80,
        price: 3000,
        minLevel: 9,
        img: "/images/fiveSeven02.png",
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: "Micro UZI",
        type: "weapon",
        power: 22,
        trait: 50,
        price: 4900,
        minLevel: 11,
        img: "/images/uzi.png",
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: "MP5",
        type: "weapon",
        power: 26,
        trait: 59,
        price: 7000,
        minLevel: 15,
        img: "/images/mp5.png",
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: "Medium Kevlar",
        type: "shield",
        power: 33,
        trait: 80,
        price: 10000,
        minLevel: 16,
        img: "/images/medKevlar.png",
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: "M4A1",
        type: "weapon",
        power: 33,
        trait: 80,
        price: 17000,
        minLevel: 20,
        img: "/images/m4a1.png",
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: "AK 47",
        type: "weapon",
        power: 34,
        trait: 57,
        price: 16800,
        minLevel: 21,
        img: "/images/ak47.png",
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: "Heavy Kevlar",
        type: "shield",
        power: 40,
        trait: 80,
        price: 20000,
        minLevel: 24,
        img: "/images/heavyKevlar.png",
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: "RPG Game Armor",
        type: "shield",
        power: 40,
        trait: 80,
        price: 27000,
        minLevel: 23,
        img: "/images/shiny.png",
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: "Jarvis",
        type: "shield",
        power: 120,
        trait: 99,
        price: 500000,
        minLevel: 45,
        img: "/images/ironman.png",
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name: "Loki's Scepter",
        type: "weapon",
        power: 150,
        trait: 99,
        price: 1000000,
        minLevel: 47,
        img: "/images/lokis.png",
        createdAt: new Date,
        updatedAt: new Date
      }
    ]
    //  return queryInterface.bulkInsert('People', [{
    //   name: 'John Doe',
    //   isBetaMember: false
    // }], {});
    return queryInterface.bulkInsert('Items', list, {});
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
