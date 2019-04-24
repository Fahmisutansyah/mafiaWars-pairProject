'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    power: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    minLevel: DataTypes.INTEGER,
    trait: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsToMany(models.Player,{through:'PlayerItems',foreignKey:'itemId'})
  };
  return Item;
};