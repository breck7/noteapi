var request = require('request'),
    Note = require('note'),
    noteapi = require('../noteapi')

var twitter = {}

twitter.search = function (note, callback) {
  
  note.q = note.query
  delete note.query
  note.rpp = note.results_per_page
  delete note.results_per_page
  
  var get = noteapi.noteToGet(note)
  
  request.get('http://search.twitter.com/search.json?' + get, function (error, response, body) {
    if (error) return callback(error)
    callback(false, new Note(JSON.parse(body)))
  })
}

module.exports = twitter
