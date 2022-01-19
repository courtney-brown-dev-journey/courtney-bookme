
   
const { publicDecrypt } = require('crypto')
const express = require('express')
const hbs = require('express-handlebars')
const res = require('express/lib/response')
const fs = require('fs')
const path = require('path')

const server = express()

//Server config 
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))

// Handlebars config
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Routes
server.get('/', (req, res) => {
  fs.readFile('./data.json' , 'utf8' , (err,data) => {
    if (err) return res.status(500).send(err.message)   
    let parsedData = JSON.parse(data)
    res.render('home', parsedData)
  })
})


module.exports = server