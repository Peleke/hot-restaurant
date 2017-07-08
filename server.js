// @Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const {sendFile, isValid} = require('./helpers')

// @Boilerplate
const app = express()
const PORT = 8000

// @Database (Mock)
const tables = []
const waitlist = []

// @Middleware
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// @Routes
app.get('/', function (req, res) {
  sendFile(res, 'index.html')
})

app.get('/reserve', function (req, res) {
  sendFile(res, 'reserve.html')
})

app.get('/tables', function (req, res) {
  sendFile(res, 'tables.html')
})

app.get('/api/:endpoint?', function (req, res) {
  switch (req.params.endpoint) {
    case 'tables':
      res.json(tables)
      break
    case 'waitlist':
      res.json(tables.slice(5))
      break
    default:
      res.status(404).json({error: 'Not Found'})
      break
  }
})

app.post('/tables', function (req, res) {
  const table = req.body

  // The code below uses this helper function:...
  // function isValid (table) {
  //   return table == undefined
  // }

  let response
  if (!isValid(table)) {
    res.status(400)
    response = {error: 'Malformed input. Check your submission and try again.'}
  } else {
    res.status(201)
    tables.push(table)
  }

  res.json(response)
})

// @Start
app.listen(PORT, function (err) {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening on port ${PORT}.`)
})
