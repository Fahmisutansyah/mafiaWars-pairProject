'use strict';
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    img:DataTypes.STRING
  }, {});
  Property.associate = function(models) {
    // associations can be defined here
    Property.belongsToMany(models.Player,{through:'PlayerProperties',foreignKey:'propertyId'})
  };
  return Property;
};