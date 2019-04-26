'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayerProperty = sequelize.define('PlayerProperty', {
    playerId: DataTypes.INTEGER,
    propertyId: DataTypes.INTEGER
  }, {
    hooks:{
      beforeDestroy: (playerItem,options)=>{
        console.log('MASUKK HOOOOOOOKKKK++++++++++++++++++++')
        let player1 = sequelize.models.Player.findByPk(playerItem.playerId)
        let item1 = sequelize.models.Property.findByPk(playerItem.propertyId)
        Promise.all([player1,item1])
        .then(([player,item])=>{
          player.money = player.money + (item.price*0.75)
          return player.save()
        })
        .then(()=>{
          console.log(`money has been added======================================================`)
        })
      }
    }
  });
  PlayerProperty.associate = function(models) {
    // associations can be defined here
  };
  return PlayerProperty;
};