const port  = process.env.PORT || 7777
const session = require('express-session')
const express = require('express')
const app = express()
const checkLogin = require('./middlewares/checkLogin')

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'tests'}))

app.set('view engine','ejs')
app.use(express.static('public'))
app.use('/login', require('./routes/login'))
app.use('/register', require('./routes/register'))
app.use('/logout',require('./routes/logout'))
app.use(checkLogin)
app.use('/home', require('./routes/home'))
app.use('/shop',require('./routes/shop'))

app.listen(port, ()=>{
    console.log(`server is running at port ${port}`)
})