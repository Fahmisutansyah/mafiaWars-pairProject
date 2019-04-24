'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    attackerId: DataTypes.INTEGER,
    defenderId: DataTypes.INTEGER,
    attack: DataTypes.INTEGER,
    defend: DataTypes.INTEGER,
    counter: DataTypes.INTEGER
  }, {});
  Game.associate = function(models) {
    // associations can be defined here    
  };
  return Game;
};