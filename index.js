const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const url = require('url')
const queryString = require('querystring')
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

// app.get('*', function(req, res){
//     res.render('404');
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})