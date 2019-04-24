'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayerProperty = sequelize.define('PlayerProperty', {
    playerId: DataTypes.INTEGER,
    propertyId: DataTypes.INTEGER
  }, {});
  PlayerProperty.associate = function(models) {
    // associations can be defined here
  };
  return PlayerProperty;
};