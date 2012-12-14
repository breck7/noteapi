var request = require('request'),
    Note = require('note'),
    noteapi = require('../noteapi')

var google = function (note, callback) {
  
  if (note.action == 'imageSearch')
    return callback(false, new Note('error Only image search is currently supported'))
  
  note.q = note.query
  delete note.query
  delete note.action
  note.v = '1.0'
  var get = noteapi.noteToGet(note)
  request.get('http://ajax.googleapis.com/ajax/services/search/images?' + get, function (error, response, body) {
    if (error) return callback(error)
    callback(false, new Note(JSON.parse(body)))
  })
}

module.exports = google
