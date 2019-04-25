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
    res.send(req.body)
})

module.exports = route