var request = require('request'),
    Note = require('note'),
    noteapi = require('../noteapi')

var wunderground = function (note, callback) {
  
  if (note.action != 'conditions')
    return callback(false, new Note('error Only conditions is currently supported'))
  
  var url = 'http://api.wunderground.com/api/' +
  note.api_key +
  '/conditions/q/' +
  note.state + '/' +
  note.city.replace(/ /, '_') +
  '.json'
  
  request.get( url, function (error, response, body) {
    if (error) return callback(error)
    callback(false, new Note(JSON.parse(body)))
  })
}

module.exports = wunderground


 