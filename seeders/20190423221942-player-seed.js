'use strict';
const fake = require('faker')
const bcrypt = require('bcryptjs')
const saltRounds = 5;

// const getHash = plain => new Promise((resolve, reject) => {
//   bcrypt.genSalt(saltRounds, (err, salt) => {
//     if (err) reject(err)
//     else bcrypt.hash(plain, salt, (err, hash) => {
//       if (err) reject(err)
//       else resolve(hash)
//     })
//   })
// })





const generate = size => Array.from(Array(size), o_o => ({
  username: fake.name.findName(),
  password: bcrypt.hashSync('123456', 10),
  experience: 0,
  level: 0,
  money: 0,
  email: fake.internet.email(),
  image: null,
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
    return queryInterface.bulkInsert('Players', generate(30), {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
     
    */
    return queryInterface.bulkDelete('Players', null, {});
  }
};
