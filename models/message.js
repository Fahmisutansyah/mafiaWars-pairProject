'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    senderId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.Player,{as:'sender',foreginKey:'senderId',otherKey:'recipientId'})
    Message.belongsTo(models.Player,{as:'recipient',foreginKey:'recipientId',otherKey:'senderId'})
  };
  return Message;
};