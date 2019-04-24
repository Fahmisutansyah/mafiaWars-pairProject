'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayerItem = sequelize.define('PlayerItem', {
    playerId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER
  }, {});
  PlayerItem.associate = function(models) {
    // associations can be defined here
  };
  return PlayerItem;
};