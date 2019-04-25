const route = require('express').Router()
const {Player} = require('../models')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
route.use(bodyParser.json())
route.use(bodyParser.urlencoded({extended:true}))
route.get('/',(req,res)=>{
    res.send(req.body)
})
route.post('/',(req,res)=>{
    let hash = bcrypt.hashSync(req.body.password,10)
    req.body.password = hash
    Player.create(req.body)
    .then(newPlayer=>{
        let msg = `Welcome! Now you may login`
        res.redirect(`/login?notif=${msg}`)
    })
    .catch(err=>{
        let msg = `Something went wrong`
        res.redirect(`/login?err=${msg}`)
    })
})

module.exports = route