var request = require('request'),
    Note = require('note'),
    noteapi = require('../noteapi')

var methods = {}


methods.charge = function (note, callback) {
  
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

methods.charges = function (note, callback) {
  
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

methods.customer = function (note, callback) {
  

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

methods.customer_delete = function (note, callback) {

  var api_key = note.api_key
  delete note.api_key
  request.del('https://api.stripe.com/v1/customers/' + note.customer_id, { headers : {
    'Authorization' : 'Bearer ' + api_key
  }}, function (error, response, body) {
    if (error) return callback(error)
    callback(false, new Note(JSON.parse(body)))
  })
}

methods.plan = function (note, callback) {
  
  var api_key = note.api_key
  delete note.api_key
  request.post('https://api.stripe.com/v1/plans', {  form : note.toObject(), headers : {
    'Authorization' : 'Bearer ' + api_key
  }}, function (error, response, body) {
    if (error) return callback(error)
    callback(false, new Note(JSON.parse(body)))
  })
  
}

methods.refund = function (note, callback) {
  
  var api_key = note.api_key
  delete note.api_key
  request.post('https://api.stripe.com/v1/charges/' + note.charge_id + '/refund', { headers : {
    'Authorization' : 'Bearer ' + api_key
  }}, function (error, response, body) {
    if (error) return callback(error)
    callback(false, new Note(JSON.parse(body)))
  })
  
}


var stripe = function (note, callback) {
  
  if (!methods[note.action])
    return callback(false, new Note('error Method not currently supported'))

  var action = note.action
  delete note.action
  methods[action](note, callback)
  
}


module.exports = stripe
