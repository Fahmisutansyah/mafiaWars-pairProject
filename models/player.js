'use strict';
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    energy: DataTypes.INTEGER,
    money: DataTypes.INTEGER,
    email: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  const Op = sequelize.Sequelize.Op
  const Item = sequelize.models.Item
  Player.associate = function (models) {
    // associations can be defined here
    // Player.belongsToMany(models.Player,{through:models.Game,as:'defender',foreignKey:'defenderId',otherKey:'attackerId'})
    // Player.belongsToMany(models.Player,{through:models.Game,as:'attacker',foreignKey:'attackerId',otherKey:'defenderId'})

    Player.hasMany(models.Game, { as: 'defender', foreignKey: 'defenderId', otherKey: 'attackerId' })
    Player.hasMany(models.Game, { as: 'attacker', foreignKey: 'attackerId', otherKey: 'defenderId' })
    Player.belongsToMany(models.Item, { through: 'PlayerItems', foreignKey: 'playerId' })
    Player.belongsToMany(models.Property, { through: 'PlayerProperties', foreignKey: 'playerId' })


  };

  Player.prototype.getEnemies = function (offset, limit) {
    return Player.findAll({
      where: { id: { [Op.ne]: this.id }, level: { [Op.lte]: this.level + 3, [Op.gte]: this.level - 4 } },
      include: [{ model: Item,  where: { type: 'shield' } }],
      limit, offset
    })
      .then(players => {
        players.forEach(p => p.calculateTotalDefense())
        return players.map(p => ({defense:p.totalDefense,...p.get({plain:true})}))
      })
  }

  Player.prototype.calculateTotalDefense = function () {
    this.totalDefense = this.Items.reduce((ttlDefense, curr) => ttlDefense + curr.power + (~~(curr.trait/2)),0)
  }

  // Player.addHook('afterUpdate', 'freeEnergy', (players, options) => {
  //   // console.log(players.length, `<<<=====...with options`, options)
  // })
  //
  Player.giveMoneyFromProperty = function () {
    Player.findAll({ attributes: ['id'], raw: true })
      .then(players => Promise.all(players.map(p => Player.findOne({ where: { id: p.id }, include: sequelize.models.Property })
        .then(player => {
          let old = player.moneys
          player.Properties.forEach(pro => { player.money += ~~(pro.price * 0.01 + 1) })
          // console.log('tobesaved---', player.get({ plain: true }))
          if (player.money > old) player.save()
        })
      )))
  }

  //deliberately return nothing
  Player.giveEnergy = function () {
    Player.findAll({ attributes: ['id'], raw: true })
      .then(players => Promise.all(players.map(p => Player.findByPk(p.id).then(player => {
        player.energy++
        // console.log('saving..to give energy or probably not')
        if (!(player.energy >= player.level + 10)) player.save()
      }))))
  }


  return Player;
};