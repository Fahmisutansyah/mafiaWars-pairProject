const port  = process.env.PORT || 7777
const session = require('express-session')
const express = require('express')
const app = express()
const routes = require('./routes')
const gameRoute = require('./routes/game')
const itemRoute = require('./routes/item')
const propertyRoute = require('./routes/property')

const bodyParser = require('body-parser');
app.locals.scoreLetter = require('./helpers').scoreLetter

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs')
app.use('/', routes)


app.use('/item', itemRoute)
app.use('/property', propertyRoute)
app.use('/game', gameRoute)

app.listen(port)