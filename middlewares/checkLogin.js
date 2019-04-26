function checkLogin(req, res, next) {
    if (!req.session.player) {
        let mssg = `You have to log in!`
        res.redirect(`/login?err=${mssg}`)
    } else {
        next()
    }
}

module.exports = checkLogin