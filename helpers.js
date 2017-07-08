const path = require('path')

exports.sendFile = function sendFile (res, filename) {
  res.sendFile(path.join(__dirname, filename))
}
