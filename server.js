const express = require('express')
const app = express()
const path = require('path')
const router = require('./app/routes/router')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.set('view engine', 'ejs')
app.use('/', router)

app.use((req, res, next) => {
    res.status(404).send('Page not found')
})
app.set('views', path.join(__dirname, './app/views'))

app.listen(3000, ()=>console.log('app running on http://localhost:3000'))