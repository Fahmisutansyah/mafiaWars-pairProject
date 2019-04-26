const port = process.env.PORT || 7777
const session = require('express-session')
const express = require('express')
const app = express()
const routes = require('./routes')
const { Player, Property } = require('./models')
// const gameRoute = require('./routes/game')
// const itemRoute = require('./routes/item')
// const propertyRoute = require('./routes/property')
const checkLogin = require('./middlewares/checkLogin')
const bodyParser = require('body-parser');
const schedule = require('node-schedule');

// Player.giveMoneyFromProperty()
// Player.findOne({where:{id:4},include:Property}).then(player=>console.log(JSON.stringify(player.get({plain:true}),null,2)))

const energySharing = schedule.scheduleJob({ second: 0 }, (time) => {
    console.log(`now we're giving energy at ${time} it actually run at ${new Date}`)
    Player.giveEnergy();

    
})

const proprtyGain = schedule.scheduleJob({ second: 45 }, (time) => {
    console.log(`property is now giving money at ${time} it actually run at ${new Date}`);
    Player.giveMoneyFromProperty();
    
})
app.locals.barCalc = require('./helpers').barCalculator
// app.locals.hitCalc = require('./helpers').generateHit
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'test',
    // resave: false,
    // saveUninitialized: false,
    // cookie: { secure: true }
}))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/login', require('./routes/login'))
app.use('/register', require('./routes/register'))
app.use('/logout', require('./routes/logout'))

app.use(checkLogin)
app.use('/home', require('./routes/home'))
app.use('/fight', require('./routes/fight'))

app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})