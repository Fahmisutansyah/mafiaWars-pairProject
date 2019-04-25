'use strict';
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    experience: {
      type:DataTypes.INTEGER,
      defaultValue: 0
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    money: {
      type:DataTypes.INTEGER,
      defaultValue: 5000
    },
    email: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      defaultValue: '/images/default.png'}
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