const route = require('express').Router()
const {Player} = require('../models')
const bodyParser = require('body-parser')
route.use(bodyParser.json())
route.use(bodyParser.urlencoded({extended:true}))

route.get('/',(req,res)=>{
    res.render('login')
})
module.exports =route