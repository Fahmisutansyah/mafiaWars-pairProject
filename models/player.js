'use strict';
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    experience: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    money: {
      type: DataTypes.INTEGER,
      defaultValue: 5000
    },
    energy: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    email: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      defaultValue: '/images/default.png'
    }
  }, {});
  const Op = sequelize.Sequelize.Op
  const Item = sequelize.models.Item
  // const PlayerItem = sequelize.models.PlayerItem
  Player.associate = function (models) {
    // associations can be defined here
    // Player.belongsToMany(models.Player,{through:models.Game,as:'defender',foreignKey:'defenderId',otherKey:'attackerId'})
    // Player.belongsToMany(models.Player,{through:models.Game,as:'attacker',foreignKey:'attackerId',otherKey:'defenderId'})

    Player.hasMany(models.Game, { as: 'defender', foreignKey: 'defenderId', otherKey: 'attackerId' })
    Player.hasMany(models.Game, { as: 'attacker', foreignKey: 'attackerId', otherKey: 'defenderId' })
    Player.hasMany(models.Message, { as: 'sender', foreignKey: 'sender', otherKey: 'recipient' })
    Player.hasMany(models.Message, { as: 'recipient', foreignKey: 'recipient', otherKey: 'sender' })

    Player.belongsToMany(models.Item, { through: models.PlayerItem, foreignKey: 'playerId' })
    Player.belongsToMany(models.Property, { through: 'PlayerProperties', foreignKey: 'playerId' })

  };

  Player.prototype.getEnemies = function (offset, limit) {
    return Player.findAll({
      where: {
        id: { [Op.ne]: this.id },
        level: { [Op.lte]: this.level + 3, [Op.gte]: this.level - 4 }
      },
      include: [{ model: Item, where: { type: 'shield' } }],
      limit,
      offset
    })
      .then(players => {
        if (players.length > 0) {
          players.forEach(p => {
            console.log(JSON.stringify(p,null,1))
            p.calculateDefenseProperties()
          })
          let result = players.map(p => ({
            defense: p.totalDefense,
            defenseM: p.totalDefenseMastery,
            ...p.get({ plain: true })
          }))
          return result
        }
        else return []
        // console.log(JSON.stringify(result, null, 2))
      })
  }

  Player.prototype.calculateDefenseProperties = function () {
    this.totalDefense = this.Items.reduce((ttlDefense, curr) => ttlDefense + curr.power + (~~(this.level*1.5)), 0)
    this.totalDefenseMastery = ~~ (this.Items.reduce((ttlDefense, curr) => ttlDefense + curr.power + (~~(curr.PlayerItem.mastery / 2)), 0) / this.Items.length)
  }

  // Player.addHook('afterUpdate', 'freeEnergy', (players, options) => {
  //   // console.log(players.length, `<<<=====...with options`, options)
  // })
  //

  // Player.addHook('beforeUpdate', 'checkMoney', (player, option) => {
  //   console.log(` ${player.id} playerMoney before`, player.money)
  //   console.log(` ${player.id} playerEnergy before`, player.energy)
  // }
  // )
  // Player.addHook('afterUpdate', 'checkMoney', (player, option) => {
  //   console.log(` ${player.id} playerMoney now`, player.money)
  //   console.log(` ${player.id} playerEnergy now`, player.energy)
  // }
  // )

  Player.giveMoneyFromProperty = function () {
    Player.findAll({ attributes: ['id'], raw: true, logging: false })
      .then(players => Promise.all(players.map(p => Player.findOne({ where: { id: p.id }, include: sequelize.models.Property, logging: false })
        .then(player => {
          // player.Properties.forEach(pro => { player.money += Math.floor(pro.price * 0.01 + 1) })
          let add = player.Properties.reduce((income, prop) => income + ~~(prop.price * 0.01), 0)
          // console.log(`adding this `, player.money, ` by `, add)
          if (add) {
            player.money += add
            player.save({ logging: false })
          }
        })
      )))
  }

  //deliberately return nothing
  Player.giveEnergy = function () {
    Player.findAll({ attributes: ['id'], raw: true }, { logging: false })
      .then(players => Promise.all(players.map(p => Player.findByPk(p.id, { logging: false }).then(player => {
        player.energy++
        // console.log('saving..to give energy or probably not')
        if (!(player.energy >= player.level + 10)) player.save({ logging: false })
      }))))
  }

  return Player;
};