'use strict';
const generate = size => Array.from(Array(size),((_, i) => ({
  playerId: i%50+1,
  itemId: i%45+(~~(Math.random()*5)),
  mastery: ~~((Math.random()*65)+30),
  createdAt: new Date,
  updatedAt: new Date
})))

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
    console.log(generate(5))

    return queryInterface.bulkInsert('PlayerItems', generate(350), {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('PlayerItems', null, {});
  }
};
