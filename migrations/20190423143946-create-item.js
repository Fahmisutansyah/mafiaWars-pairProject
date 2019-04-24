'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      type: {
        type: Sequelize.STRING
      },
      power: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      trait: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      price: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      minLevel: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      
      img: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Items');
  }
};