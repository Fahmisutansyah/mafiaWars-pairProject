const routes = require('express').Router()
const { Player } = require('../models')


//test, this put find one get plain true data into session
routes.get('/energymoney', function (req, res) {
    Player.findByPk(req.session.player.id)
        .then(player => {
            if (player) res.json({ energy: player.energy, money: player.money })
            else res.json({ energy: 'player undefined', money: 'player undefined' })
        })
        .catch(err => {
            console.log(err)
            res.json({ energy: 'error', money: 'error' })
        })
})
routes.get('/logout', function (req, res) {
    req.session.player = null
    res.json(req.session.player)
})

module.exports = routes