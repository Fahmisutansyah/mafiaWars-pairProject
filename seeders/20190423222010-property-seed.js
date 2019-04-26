'use strict';
// const faker = require('faker')
// const basePrice = 50

// const generate = size => Array.from(Array(size), (o_o,i) => ({
//   name: `${faker.name.firstName()}-building`,  
//   price: (((i%50)+1)*basePrice) + ((i%50)+1) * (~~(Math.random()*(basePrice+100))+basePrice),  
//   img: null,
//   createdAt: new Date,
//   updatedAt: new Date
// }))

let list =[
  {
    name: "Warkop",
    price: 1000,
    img: "/images/warkop.jpg",
    createdAt: new Date,
    updatedAt: new Date
  },{
    name: "Indomaret",
    price: 3000,
    img: "/images/indomaret.jpg",
    createdAt: new Date,
    updatedAt: new Date
  },{
    name: "Family Mart",
    price: 4000,
    img: "/images/familyMart.jpg",
    createdAt: new Date,
    updatedAt: new Date
  },{
    name: "McDonald's",
    price: 10000,
    img: "/images/mcd.jpg",
    createdAt: new Date,
    updatedAt: new Date
  },{
    name: "A&W",
    price: 17000,
    img: "/images/aw.jpg",
    createdAt: new Date,
    updatedAt: new Date
  },{
    name: "Union",
    price: 30000,
    img: "/images/union.jpg",
    createdAt: new Date,
    updatedAt: new Date
  },{
    name: "Hacktiv8",
    price: 40000,
    img: "/images/hacktiv.jpg",
    createdAt: new Date,
    updatedAt: new Date
  },{
    name: "Arion",
    price: 60000,
    img: "/images/arion.jpg",
    createdAt: new Date,
    updatedAt: new Date
  },{
    name: "Mall Kelapa Gading",
    price: 100000,
    img: "/images/mkg.jpg",
    createdAt: new Date,
    updatedAt: new Date
  },{
    name: "Monumen Nasional",
    price: 250000,
    img: "/images/monas.jpg",
    createdAt: new Date,
    updatedAt: new Date
  },{
    name: "Hotel Fairmont",
    price: 600000,
    img: "/images/fairmont.jpg",
    createdAt: new Date,
    updatedAt: new Date
  },{
    name: "Marina Bay Sands",
    price: 1500000,
    img: "/images/marina.jpg",
    createdAt: new Date,
    updatedAt: new Date
  }
]


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
   return queryInterface.bulkInsert('Properties', list, {});
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
