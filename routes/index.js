const routes = require('express').Router()






routes.get('/', function (req, res) {
    res.json({
        title: `home page`,
        features: [`log in`, `register`]
    })
    // res.render('../views/index.ejs')
})

routes.get('/register', function (req, res) {
    res.json({
        title: `home page`,
        fields: [`username`,'password','image','email']
    })
    // res.render('../views/index.ejs')
})

routes.post('/register', function (req, res) {
    res.json({
        title: `home page`,
        features: [`log in`, `register`]
    })
    // res.render('../views/index.ejs')
})

