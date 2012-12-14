var request = require('request'),
    Note = require('note'),
    noteapi = require('../noteapi')

var github = function (note, callback) {
  
  if (note.action != 'commits')
    return callback(false, new Note('error Only commits list is currently supported'))
  
  request.get(note.repo + '/commits', function (error, response, body) {
    if (error) return callback(error)
    callback(false, new Note(JSON.parse(body)))
  })
}

module.exports = github
