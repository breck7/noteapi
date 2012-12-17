var request = require('request'),
    Note = require('note'),
    noteapi = require('../noteapi')

var facebook = function (note, callback) {
  
  var url
  if (note.query)
   url = 'https://graph.facebook.com/search?q=' + note.query + '&type=' + note.type
  
  if (note.objectId)
    url = 'https://graph.facebook.com/' + note.objectId 
  
  if (note.username)
    url = 'https://graph.facebook.com/' + note.username 
  
  
  request.get(url, function (error, response, body) {
    if (error) return callback(error)
    callback(false, new Note(JSON.parse(body)))
  })
}

module.exports = facebook
