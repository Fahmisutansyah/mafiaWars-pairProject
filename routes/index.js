const routes = require('express').Router()
const { Player } = require('../models')





routes.get('/', function (req, res) {
    res.json({
        title: `home page`,
        features: [`log in`, `register`]
    })
    // res.render('../views/index.ejs')
})

routes.get('/register', function (req, res) {
    res.json({
        title: `home page`,
        fields: [`username`, 'password', 'image', 'email']
    })
    // res.render('../views/index.ejs')
})
//test, this put find one get plain true data into session
routes.get('/login/:id', function (req, res) {
    Player.findOne({ where: { id: req.params.id } })
        .then(player => res.json(player))
})

routes.post('/register', function (req, res) {
    res.json({
        title: `home page`,
        features: [`log in`, `register`]
    })
    // res.render('../views/index.ejs')
})

