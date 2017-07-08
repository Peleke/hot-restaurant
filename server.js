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
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

// @Routes
app.get('/:endpoint?', function (req, res) {
  switch (req.params.endpoint) {
    case undefined:
    case '/':
      sendFile(res, 'index.html')
      break
    case 'reserve':
      sendFile(res, 'reserve.html')
      break
    case 'tables':
      sendFile(res, 'tables.html')
      break
    default:
      sendFile(res, '404.html')
      break
  }
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
