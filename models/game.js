'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    attackerId: DataTypes.INTEGER,
    defenderId: DataTypes.INTEGER,
    attack: DataTypes.INTEGER,
    defend: DataTypes.INTEGER,
    counter: DataTypes.INTEGER,
    result: DataTypes.STRING
  }, {});
  Game.associate = function(models) {
    // associations can be defined here    
    Game.belongsTo(models.Player, { as: 'defender', foreignKey: 'defenderId', otherKey: 'attackerId' })
    Game.belongsTo(models.Player, { as: 'attacker', foreignKey: 'attackerId', otherKey: 'defenderId' })
  };
  return Game;
};