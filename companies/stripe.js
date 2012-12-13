var request = require('request'),
    Note = require('note'),
    noteapi = require('../noteapi')

var stripe = {}

stripe.charge = function (note, callback) {
  
  var get = noteapi.noteToGet(note)
  var api_key = note.api_key
  delete note.api_key
  noteapi.flattenNote('card', note)
  console.log(note.toString())
  request.post('https://api.stripe.com/v1/charges', { form : note.toObject(), headers : {
    'Authorization' : 'Bearer ' + api_key
  }}, function (error, response, body) {
    if (error) return callback(error)
    callback(false, new Note(JSON.parse(body)))
  })
}

stripe.refund = function (note, callback) {
  
  var api_key = note.api_key
  delete note.api_key
  request.post('https://api.stripe.com/v1/charges/' + note.charge_id + '/refund', { headers : {
    'Authorization' : 'Bearer ' + api_key
  }}, function (error, response, body) {
    if (error) return callback(error)
    callback(false, new Note(JSON.parse(body)))
  })
  
}

module.exports = stripe
