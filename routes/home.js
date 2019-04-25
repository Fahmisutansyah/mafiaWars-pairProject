const route = require('express').Router()
const {Player, Property, Item} = require('../models')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
route.use(bodyParser.json())
route.use(bodyParser.urlencoded({extended:true}))
route.get('/',(req,res)=>{
    Player.findOne({where:{id:req.session.player.id},include: [Property,Item]})
    .then(player=>{
        res.render('home',{player:req.session.player, property: player.Properties, items: player.Items})
        // res.send(player)
    })
    // res.send(req.session)
})

module.exports =route