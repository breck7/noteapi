var Note = require('note')

noteapi = {}

noteapi.noteToGet = function (note) {
  var string = ''
  var first = ''
  for (var name in note.names()) {
    string += first + encodeURIComponent(name) + '=' + encodeURIComponent(note[name])
    first = '&'
  }
  return string
}

/**
 * Turn this:
 * card
 *  number 123
 *  name John Doe
 *
 * into this:
 * card[number] 123
 * card[name] John Doe
 */
noteapi.flattenNote = function (root, note) {
  for (var name in note[root].names()) {
    note[root + '[' + name + ']'] = note[root][name]
  }
  delete note[root]
}

module.exports = noteapi
