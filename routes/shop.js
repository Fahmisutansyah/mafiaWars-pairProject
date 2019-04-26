const route = require('express').Router()
const {Player, Item, Property,PlayerItem,PlayerProperty} = require('../models')
const bodyParser = require('body-parser')
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: true }));
const buyPermission = require('../middlewares/permission')
const investReq = require('../middlewares/invest')


route.get('/', (req,res)=>{
    Promise.all([Item.findAll(),Property.findAll(),Player.findOne({where:{id:req.session.player.id},include: [Property,Item]})])
    .then(([items,properties,player])=>{
        // res.render('shop', {player: req.session.player, items,properties})
        let ownedProp =[]
        let ownedItems = []
        player.Properties.forEach(element=>{
            ownedProp.push(element.name)
        })
        player.Items.forEach(element=>{
            ownedItems.push(element.name)
        })
        res.render('shop', {items,properties,player,ownedItems,ownedProp, err: req.query.err,notif: req.query.notif})
    })
    .catch(err=>{
        res.send(err)
    })
})

route.get('/buy/item/:itemId',buyPermission,(req,res)=>{
   Promise.all([Player.findByPk(req.session.player.id), Item.findByPk(req.params.itemId)])
   .then(([player,item])=>{
       player.money = player.money - item.price
       return Promise.all([player.save(), player.addItems([item])])
   })
   .then(([saved,created])=>{
       res.redirect('/shop?notif=Successful Purchase')
   })
   .catch(err=>{
       res.send(err.message)
   })
})
route.get('/sell/item/:itemId',(req,res)=>{
    PlayerItem.findOne({where:{itemId: req.params.itemId,playerId: req.session.player.id}})
    .then(data=>{
        return data.destroy()
    })
    .then(data=>{
        res.redirect('/shop?notif=SOLD!')
    })
    .catch(err=>{
        console.log(err.message)
        res.send(err.message)
    })
})
route.get('/buy/prop/:propId',investReq,(req,res)=>{
    Promise.all([Player.findByPk(req.session.player.id), Property.findByPk(req.params.propId)])
    .then(([player,item])=>{
        player.money = player.money - item.price
        return Promise.all([player.save(), player.addProperties([item])])
    })
    .then(([saved,created])=>{
        res.redirect('/shop?notif=Successful Property Purchase!')
    })
    .catch(err=>{
        res.send(err.message)
    })
 })
 route.get('/sell/prop/:propId',(req,res)=>{
    PlayerProperty.findOne({where:{propertyId: req.params.propId,playerId: req.session.player.id}})
    .then(data=>{
        return data.destroy()
    })
    .then(data=>{
        res.redirect('/shop?notif=SOLD!')
    })
    .catch(err=>{
        console.log(err.message)
        res.send(err.message)
    })
})



module.exports = route



