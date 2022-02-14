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

server.get('/year', (req, res) => {
  fs.readFile('./data.json' , 'utf8' , (err,data) => {
    if (err) return res.status(500).send(err.message)   
    let parsedData = JSON.parse(data)
    res.render('year-view', parsedData)
  })
})

server.get('/genre', (req, res) => {
  fs.readFile('./data.json' , 'utf8' , (err,data) => {
    if (err) return res.status(500).send(err.message)   
    let parsedData = JSON.parse(data)
    res.render('genre-view', parsedData)
  })
})

server.get('/books', (req, res) => {
  fs.readFile('./data.json' , 'utf8' , (err,data) => {
    if (err) return res.status(500).send(err.message)   
    let parsedData = JSON.parse(data)
    res.render('all-books', parsedData)
  })
})

server.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  fs.readFile('./data.json', 'utf8',(err, data) => {
    if (err) return res.status(500).send(err.message)
    let parsedData = JSON.parse(data)
    const singleBook = parsedData.books.find(data => data.id === id)
    res.render('book-view', singleBook)
  })
})

// server.get('/genre'(req, res) => {
//     let parsedData = JSON.parse(data)
//     const chooseGenre = parsedData.books.find(data => data.genre === genre)
//     res.render('book-view', chooseGenre)

// })



  //   if (err) return res.status(500).send(err.message)   
  //   const parsedData = JSON.parse(data).books
  //   const theBook = parsedData.find((element) => element.id == req.params.id)
module.exports = server