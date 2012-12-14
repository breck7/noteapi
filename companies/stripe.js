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

stripe.charges = function (note, callback) {
  
  var get = noteapi.noteToGet(note)
  var api_key = note.api_key
  delete note.api_key
  request.get('https://api.stripe.com/v1/charges?count=' + note.count, { headers : {
    'Authorization' : 'Bearer ' + api_key
  }}, function (error, response, body) {
    if (error) return callback(error)
    callback(false, new Note(JSON.parse(body)))
  })
}

stripe.customer = function (note, callback) {
  

  var api_key = note.api_key
  delete note.api_key
  noteapi.flattenNote('card', note)
  request.post('https://api.stripe.com/v1/customers', { form : note.toObject(), headers : {
    'Authorization' : 'Bearer ' + api_key
  }}, function (error, response, body) {
    if (error) return callback(error)
    callback(false, new Note(JSON.parse(body)))
  })
}

stripe.customer_delete = function (note, callback) {

  var api_key = note.api_key
  delete note.api_key
  request.del('https://api.stripe.com/v1/customers/' + note.customer_id, { headers : {
    'Authorization' : 'Bearer ' + api_key
  }}, function (error, response, body) {
    if (error) return callback(error)
    callback(false, new Note(JSON.parse(body)))
  })
}

stripe.plan = function (note, callback) {
  
  var api_key = note.api_key
  delete note.api_key
  request.post('https://api.stripe.com/v1/plans', {  form : note.toObject(), headers : {
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
