'use strict';
const generate = size=> Array.from(Array(size),((_,i)=>({
  playerId:i%50,
  propertyId:i%50+(~~(i/50)),
  createdAt:new Date,
  updatedAt:new Date
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
   
   return queryInterface.bulkInsert('PlayerProperties', generate(100), {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('PlayerProperties', null, {});
  }
};
