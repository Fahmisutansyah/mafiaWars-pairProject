const routes = require('express').Router()
const { Player } = require('../models')


//test, this put find one get plain true data into session
routes.get('/login/:id', function (req, res) {
    Player.findOne({ where: { id: req.params.id } })
        .then(player => {
            let sessionData = player.get({ plain: true })
            delete sessionData.password
            req.session.player = sessionData
            // req.session.player
            res.json(req.session)
        })
        .catch(err => res.json(err))
})

module.exports = routes