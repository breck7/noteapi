var express = require('express'),
    fs = require('fs'),
    request = require('request'),
    Note = require('note'),
    app = express(),
    companies = {},
    examples = new Note()


// Grab all APIs
var files = fs.readdirSync(__dirname + '/companies/')
for (var j in files) {
  
  // Dont read non js files
  if (!files[j].match(/\.js$/))
    continue

  var company = files[j].replace(/\.js$/, '')
  // Load every module
  companies[company] = require('./companies/' + company)
  examples[company] = new Note(fs.readFileSync('./companies/' + company + '.note', 'utf8'))
}

app.use(express.bodyParser())
app.use('/', express.static(__dirname + '/public/', { maxAge: 31557600000 }))

app.get('/companies', function (req, res) {
  res.send(examples.toString())
})

app.post('/', function(req, res){
  
  var note = new Note(req.body.note)
  var company = note.company
  if (!companies[company])
    return res.send('error Company ' + company + ' not found.')

  companies[company](note.request, function (error, response) {
    res.send(response.toString())  
  })
  
})

app.listen(80)
