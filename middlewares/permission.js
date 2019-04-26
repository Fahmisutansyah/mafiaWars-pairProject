const {Player,Item} = require('../models')
module.exports = (req,res,next) =>{
    const playa = Player.findOne({where:{id:req.session.player.id},include: Item})
    const barang = Item.findByPk(req.params.itemId)
    Promise.all([playa,barang])
    .then(([player,item])=>{
        let owned
        if(player.Items.length === 1){
            owned = player.Items[0]
        }

        if (player.Items.length === 2){
            throw new Error(`You have to sell an item that has the same type of item that you want to buy!`)
        }else if (player.level < item.minLevel){
            throw new Error(`You don't meet the level requirement!`)
        }else if (owned&&owned.type === item.type){
            throw new Error(`You already have the same type of item! Sell it first!`)
        }else if (player.money < item.price){
            throw new Error(`You don't have enough money to buy that item!`)
        }else{
            next()
        }
    })
    .catch(err=>{
        let msg = err.message
        res.redirect(`/shop?err=${msg}`)
    })
}