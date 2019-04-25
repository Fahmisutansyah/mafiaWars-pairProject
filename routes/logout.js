const route = require('express').Router()
const {Player} = require('../models')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
route.use(bodyParser.json())
route.use(bodyParser.urlencoded({extended:true}))

route.get('/',(req,res)=>{
    delete req.session.player
    res.redirect('/login')
    // res.send(req.session)
})

module.exports = route