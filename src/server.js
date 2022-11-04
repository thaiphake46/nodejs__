import express from "express"
import configViewEngine from "./config/viewEngine"
import initWebRoute from './routes/web'
import initAPIRoute from './routes/api'
import validator from 'validator'
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

// console.log(validator.isLength('foo@b', { min: 8 }))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

configViewEngine(app)
initWebRoute(app)
initAPIRoute(app)




app.listen(port, () => {
    console.log('Port: ', port)
})