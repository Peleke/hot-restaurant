// @Dependencies
const express = require('express')
const bodyParser = require('body-parser')

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
  res.send('Welcome home.')
})

app.get('/reserve', function (req, res) {
  res.send('Make a reservation.')
})

app.get('/tables', function (req, res) {
  res.send('View the tables.')
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
      res.send(404, 'Not found')
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
