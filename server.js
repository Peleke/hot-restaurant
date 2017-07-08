// @Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const {sendFile} = require('./helpers')

// @Boilerplate
const app = express()
const PORT = 8000

// @Middleware
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
      res.send('Tables data')
      break
    case 'waitlist':
      res.send('Waitlist data')
      break
    default:
      res.status(404).send('Not found')
      break
  }
})

// @Start
app.listen(PORT, function (err) {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening on port ${PORT}.`)
})
