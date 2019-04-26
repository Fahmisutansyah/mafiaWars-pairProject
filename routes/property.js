const routes = require('express').Router()
const { Player } = require('../models')





routes.get('/', function (req, res) {
    res.json({
        title: `home page`,
        features: [`log in`, `register`]
    })
    // res.render('../views/index.ejs')
})
