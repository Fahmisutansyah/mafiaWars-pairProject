'use strict';
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    money: DataTypes.INTEGER,
    email: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Player.associate = function(models) {
    // associations can be defined here
    // Player.belongsToMany(models.Player,{through:models.Game,as:'defender',foreignKey:'defenderId',otherKey:'attackerId'})
    // Player.belongsToMany(models.Player,{through:models.Game,as:'attacker',foreignKey:'attackerId',otherKey:'defenderId'})

    Player.hasMany(models.Game,{as:'defender',foreignKey:'defenderId',otherKey:'attackerId'})
    Player.hasMany(models.Game,{as:'attacker',foreignKey:'attackerId',otherKey:'defenderId'})
    Player.belongsToMany(models.Item,{through:'PlayerItems',foreignKey:'playerId'})
    Player.belongsToMany(models.Property,{through:'PlayerProperties',foreignKey:'playerId'})
    

  };
  return Player;
};