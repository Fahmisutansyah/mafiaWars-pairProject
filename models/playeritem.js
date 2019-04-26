'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayerItem = sequelize.define('PlayerItem', {
    playerId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    mastery: {
      type: DataTypes.INTEGER,
      defaultValue: 50
    }
  }, {});
  PlayerItem.associate = function (models) {
    // associations can be defined here
  };
  return PlayerItem;
};