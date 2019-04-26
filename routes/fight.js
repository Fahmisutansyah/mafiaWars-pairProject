const routes = require('express').Router()
const Op = require('sequelize').Op
const { Player, Item, Game } = require('../models')
const END = 'END'
const START = 'START'
const MID = 'MID'
const hitCalc = require('../helpers').generateHit

routes.get('/', function (req, res) {
    Player.findByPk(req.session.player.id)
        .then(player => {
            console.log(player)
            if (player) return Promise.all([
                player.getEnemies(0, 5),
                player.getItems({ where: { type: 'weapon' } })
            ])
            else throw new Error(`strangely the instance with id of ${req.session.player.id} is non existent`)
        })
        .then(([enemies, weapons]) => {
            // res.json({
            //     title: `fighting pit`,
            //     weapons,
            //     enemies
            // })
            // console.log(player.Items.map(it => ({ id: it.id, power: it.power, trait: it.trait })))
            console.log(enemies)
            req.session.game = {}
            req.session.game.weapons = (weapons.length) ? weapons.map(it => ({ id: it.id, power: it.power, mastery: it.PlayerItem.mastery, name: it.name }))
                : []
            req.session.game.enemies = enemies.map(en => ({ id: en.id, defense: en.defense, mastery: en.defenseM, username: en.username }))
            // // // req.session.player.player = player
            res.render('../views/fightStart.ejs', {
                title: `fighting pit`,
                weapons,
                enemies,
                err : req.query.err
            })
        })
        .catch(err => {
            console.log(err)
            res.send(req.session)
        })
    // player.getEnemies(offset, limit)
    // res.render('../views/index.ejs')
})


routes.post('/', function (req, res) {
    // console.log(req.body)
    // res.json(req.body)
    let wp = req.session.game.weapons
    let en = req.session.game.enemies

    Player.findByPk(req.session.player.id).then(player => {
        if (player.energy >= 6) {
            //we can fight
            player.energy -= 6
            player.save().then(result => {

                console.log(wp, en)
                console.log(`=====`)
                if (!Array.isArray(req.body.weapons)) req.body.weapons = [req.body.weapons]
                console.log(req.body)
                console.log(`=====`)
                wp = wp.filter(weapon => req.body.weapons.some(w => w == weapon.id))
                en = en.filter(enemy => enemy.id == req.body.enemy)


                req.session.game.weapons = wp
                req.session.game.enemy = en[0]
                req.session.game.enemy.inHit = 0
                req.session.game.turn = 5
                req.session.game.status = START


                delete req.session.game.enemies
                // res.json({ wp, en })
                res.render(`../views/fighting.ejs`, {
                    status: req.session.game.status,
                    turn: req.session.game.turn,
                    player: req.session.player,
                    weapons: req.session.game.weapons,
                    enemy: req.session.game.enemy,
                    msgs: [],
                    topMessage: `Attack the defending enemy`
                })
            })
        }

        else {
            //insuffincient energy
            res.redirect(`/fight?err=Insufficient Energy!`)
        }
    })

})

routes.post('/fighting', function (req, res) {
    // console.log(req.body)
    // res.json(req.body)
    let msgs = []
    let topMessage = 'attack your enemy again'
    if (req.session.game.enemy.inHit >= req.session.game.enemy.defense && req.session.game.turn > -1) {
        req.session.game.status = END
        topMessage = `yayy, You win`
    } else {
        if (req.session.game.status != END) {
            msgs = req.session.game.weapons.map(weapon => hitCalc(weapon, req.session.game.weapons.length, req.body.attack))
            req.session.game.enemy.inHit += msgs.reduce((totalHit, curr) => totalHit + curr.hit, 0)

            if (req.session.game.enemy.inHit >= req.session.game.enemy.defense && req.session.game.turn > -1) {
                //win, give out winning message        
                req.session.game.status = END
                // msgs.push({msg:`You Win`})
                topMessage = `yayy, You win`

            } else if (req.session.game.turn <= 0) {
                //lose, give out losing message
                req.session.game.status = END
                // msgs.push({msg:`You Lose`})
                topMessage = `You Lose`
            }
        } else {
            topMessage = 'game over'
        }
    }

    if (req.session.game.status != END && req.session.game.turn > 0) req.session.game.turn--

    res.render(`../views/fighting.ejs`, {
        status: req.session.game.status,
        turn: req.session.game.turn,
        player: req.session.player,
        weapons: req.session.game.weapons,
        enemy: req.session.game.enemy,
        msgs,
        topMessage
    })

})



// name: DataTypes.STRING,
//     type: DataTypes.STRING,
//     power: DataTypes.INTEGER,
//     price: DataTypes.INTEGER,
//     minLevel: DataTypes.INTEGER,
//     trait: DataTypes.INTEGER,
//     img: DataTypes.STRING
routes.get(`/freeItem`, (req, res) => {
    Promise.all([Item.create({ name: `tokalev-free-${~~(Math.random() * 23)}`, type: `weapon`, power: 50, minLevel: 1, trait: 50, img: null }, { returning: true })
        , Player.findAll({})])
        .then(([newW, players]) => {
            if (newW && players.length > 0) {
                return Promise.all(players.map(player => player.addItems(neww, { through: { mastery: 50 } })))
            }
            else {
                throw new Error('wrong data, or uncomplete')
            }
        }).then(result => res.send({ mess: 'item given?', result })).catch(err => res.send(err))
})

module.exports = routes