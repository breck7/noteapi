var request = require('request'),
    Note = require('note'),
    noteapi = require('../noteapi')

var duckduckgo = function (note, callback) {

  note.q = note.query
  delete note.query
  note.format = 'json'
  var get = noteapi.noteToGet(note)
  request.get('http://api.duckduckgo.com/?' + get, function (error, response, body) {
    if (error) return callback(error)
    callback(false, new Note(JSON.parse(body)))
  })
}

module.exports = duckduckgo
