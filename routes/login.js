const route = require('express').Router()
const { Player } = require('../models')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
route.use(bodyParser.json())
route.use(bodyParser.urlencoded({ extended: true }))

route.get('/:id', (req, res) => {
    Player.findOne({ where: { id: req.params.id } })
        .then(player => {
            req.session.player = player.get({ plain: true })
            delete req.session.player.password
            res.json(req.session)
        })
        .catch(err => {
            res.json(err)
        })
})

route.post('/', (req, res) => {
    Player.findOne({ where: { username: req.body.username } })
        .then(player => {
            let check = bcrypt.compareSync(req.body.password, player.password)
            if (check) {
                req.session.player = player.get({ plain: true })
                delete req.session.player.password
                res.redirect('/home')
            } else {
                let mssg = `Username/password wrong!`
                res.redirect(`/login?err=${mssg}`)
            }
        })
})
module.exports = route