const path = require('path')

exports.sendFile = function sendFile (res, filename) {
  res.sendFile(path.join(__dirname, filename))
}

exports.isValid = function isValid (table) {
  // verify that table is valid--for now, just verify nonnullity
  return !!table
}
