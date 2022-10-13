const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello world voi express')
})

app.get('/about', (req, res) => {
    res.send('I\'m Huy Thai')
})

app.listen(port, () => {
    console.log('Port: ', port)
})