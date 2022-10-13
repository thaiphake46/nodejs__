import express from "express"
import configViewEngine from "./config/viewEngine"
import initWebRoute from './routes/web'
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

configViewEngine(app)
initWebRoute(app)




app.listen(port, () => {
    console.log('Port: ', port)
})