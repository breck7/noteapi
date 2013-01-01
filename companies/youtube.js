var request = require('request'),
    Note = require('note'),
    noteapi = require('../noteapi')

var youtube = function (note, callback) {
  
  var url
  if (note.query)
   url = 'https://gdata.youtube.com/feeds/api/videos?v=2&alt=jsonc&q=' + note.query
  
  if (note.videoId)
    url = 'https://gdata.youtube.com/feeds/api/videos/' + note.videoId + '?v=2&alt=jsonc'
  
  
  request.get(url, function (error, response, body) {
    if (error) return callback(error)
    callback(false, new Note(JSON.parse(body)))
  })
}

module.exports = youtube