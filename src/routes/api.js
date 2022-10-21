import express from "express";
import APIControllers from '../controllers/APIControllers'

let router = express.Router()

const initAPIRoute = (app) => {
    router.get('/users', APIControllers.getAllUser) // method get - > read data
    router.post('/create-user', APIControllers.createNewUser) // method post - > create data
    router.put('/update-user', APIControllers.updateUser)
    router.delete('/delete-user/:id', APIControllers.deleteUser)

    return app.use('/api/v1', router)
}

module.exports = initAPIRoute