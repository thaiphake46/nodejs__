import express from "express";
import homeControllers from '../controllers/homeControllers'

let router = express.Router()

const initWebRoute = (app) => {
    router.get('/', homeControllers.getHomePage)

    router.get('/about', (req, res) => {
        res.send('I\'m Huy Thai')
    })

    return app.use('/', router)
}

module.exports = initWebRoute