var request = require('request'),
    Note = require('note'),
    noteapi = require('../noteapi')

var github = {}

github.commits = function (note, callback) {
  
  request.get(note.repo + '/commits', function (error, response, body) {
    if (error) return callback(error)
    callback(false, new Note(JSON.parse(body)))
  })
}

module.exports = github
