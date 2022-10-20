import express from "express";
import homeControllers from '../controllers/homeControllers'

let router = express.Router()

const initWebRoute = (app) => {
    router.get('/', homeControllers.getHomePage)
    router.get('/detail/user/:id', homeControllers.getDetailPage)
    router.post('/create-data-user', homeControllers.createNewUser)

    return app.use('/', router)
}

module.exports = initWebRoute