const routes = require('express').Router()
const Op = require('sequelize').Op
const { Player, Item,Game } = require('../models')

routes.get('/', function (req, res) {
    Player.findByPk(req.session.player.id, {
        attributes: { exclude: [`password`] },
        include: [{ model: Item, where: { type: 'weapon' } }]
    })
        .then(player => Promise.all([player, player.getEnemies(0, 5)]))
        .then(([player, fightData]) => {

            // res.json({
            //     title: `fighting pit`,
            //     features: [`choose weapon`, 'choose enemy'],
            //     player,
            //     enemies: fightData
            // })

            

            res.render('../views/fightStart.ejs', {
                title: `fighting pit`,
                features: [`choose weapon`, 'choose enemy'],
                weapons: player.Items,
                player,
                enemies: fightData
            })
        })
        .catch(err => res.json(err))
    // player.getEnemies(offset, limit)
    // res.render('../views/index.ejs')
})


routes.post('/', function (req, res) {
    console.log(req.body)
    // res.json(req.body)
    // attackerId: DataTypes.INTEGER,
    // defenderId: DataTypes.INTEGER,
    // attack: DataTypes.INTEGER,
    // defend: DataTypes.INTEGER,
    // counter: DataTypes.INTEGER
    Promise.call ([
        Item.findAll({where:{id:{[Op.or]:weapons}}}),

    ])
    


    Game.create({attackerId:req.session.player.id,defenderId:enemy, attack:weapon, defend:1000, counter: 5})
    // then(([player, fightData]) => res.json({
    //     title: `fighting pit`,
    //     features: [`choose weapon`, 'choose enemy'],
    //     player,
    //     enemies: fightData
    // }))
    //     .catch(err => res.json(err))
    // player.getEnemies(offset, limit)
    // res.render('../views/index.ejs')
})

module.exports = routes