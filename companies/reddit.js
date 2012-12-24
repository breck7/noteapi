var request = require('request'),
    Note = require('note'),
    noteapi = require('../noteapi')

var reddit = function (note, callback) {
  
  var query = note.query
  note.reddit = note.subreddit
  var options = ['reddit', 'author', 'site', 'self', 'nsfw']
  for (var i in options) {
    var option = options[i]
    if (note[option])
      query += ' ' + option + ':' + note[option]
  }
  
  var search = new Note()
  search.q = query
  search.limit = note.limit
  search.top = note.top
  search.t = note.time
  
  var url = 'http://www.reddit.com/search.json?' + noteapi.noteToGet(search)
  request.get(url, function (error, response, body) {
    if (error) return callback(error)
    callback(false, new Note(JSON.parse(body)))
  })
}

module.exports = reddit
