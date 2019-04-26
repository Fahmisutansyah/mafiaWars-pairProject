'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayerItem = sequelize.define('PlayerItem', {
    playerId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER
  }, {
    hooks:{
      beforeDestroy: (playerItem,options)=>{
        console.log('MASUKK HOOOOOOOKKKK++++++++++++++++++++')
        let player1 = sequelize.models.Player.findByPk(playerItem.playerId)
        let item1 = sequelize.models.Item.findByPk(playerItem.itemId)
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
  PlayerItem.associate = function(models) {
    // associations can be defined here
  };
  return PlayerItem;
};