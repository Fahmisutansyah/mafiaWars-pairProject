const {Player,Property} = require('../models')
module.exports = (req,res,next) =>{
    const playa = Player.findOne({where:{id:req.session.player.id}})
    const barang = Property.findByPk(req.params.propId)
    Promise.all([playa,barang])
    .then(([player,prop])=>{
        if (player.money < prop.price){
            throw new Error(`You don't have enough money to buy the property`)
        }else{
            next()
        }
    })
    .catch(err=>{
        let msg = err.message
        res.redirect(`/shop?err=${msg}`)
    })
}  