const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOpts = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

const bodyOpts = {
  describe: 'Note content',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOpts,
    body: bodyOpts
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOpts
  })
  .command('remove', 'Delete a note', {
    title: titleOpts
  })
  .help()
  .argv;
var command = argv._[0];

if ( command === 'add' ) {
  var note = notes.addNote(argv.title, argv.body);

  if ( note ) {
    console.log('--')
    console.log('Note created!');
    notes.logNote(note);
  } else {
    console.log('--');
    console.log('Note title taken!');
    console.log('--');
  }
} else if ( command === 'list' ) {
  var allNotes = notes.getAll();

  if (allNotes.length > 0) {
    console.log('--');
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));
  } else {
    console.log('--');
    console.log('You do not have any notes! What about creating some? ;)');
    console.log('--');
  }
} else if ( command === 'read' ) {
  var note = notes.getNote(argv.title);

  if ( note ) {
    console.log('--');
    console.log('Note found!');
    notes.logNote(note);
  } else {
    console.log('--');
    console.log('We could not find any note with that title!');
    console.log('--');
  }
} else if ( command === 'remove' ) {
  var res = notes.removeNote(argv.title);

  if ( res ) {
    console.log('--');
    console.log('Note removed!');
    console.log('--');
  } else {
    console.log('--');
    console.log('That note does not exist!');
    console.log('--');
  }
} else {
  console.log('Command not recognized!');
}
