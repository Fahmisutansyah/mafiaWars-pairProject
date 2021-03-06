'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PlayerItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playerId: {
        type: Sequelize.INTEGER        
      },
      itemId: {
        type: Sequelize.INTEGER        
      },
      mastery: {
        type: Sequelize.INTEGER,
        defaultValue:50        
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PlayerItems');
  }
};