import express from "express"
import configViewEngine from "./config/viewEngine"

const app = express()
const port = 3000

configViewEngine(app)

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/about', (req, res) => {
    res.send('I\'m Huy Thai')
})

app.listen(port, () => {
    console.log('Port: ', port)
})