
// pulling in express and other dependecies 
const express = require('express');
const path = require('path');
const app = express();
const dbTools = require('./db')
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3333;
// middleware path
app.use(express.static('public'));
app.use(express.json());

// listens for landing pagea nd sends response index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));

});
// listens for notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));

});
// listens for the notes array from database and allows the front end to write the data into the fields required.
app.get('/api/notes/:notes', (req, res) => {
  const noteData = dbTools.getData();
  const note = req.params.note

  const obj = noteData.find(noteObj => noteObj.title === note);

  if (obj) {
    return res.json(obj);
  }

  res.json({
    message: 'no notes stored.'
  });

});

// listen for the note data aka the note array in the db.json
app.get('/api/notes', (req, res) => {
  const noteData = dbTools.getData();
  res.json(noteData);

})
// listens for the post funciton which allows the user on the front end to enter new data
app.post('/api/notes', (req, res) => {
  const notes = dbTools.getData();
  const newNote = req.body;
  // writes an randomly generated id using uuid so that it can be dleted if need be.
  newNote.id = uuidv4();


  notes.push(newNote);
  dbTools.writeData(notes);

  res.json({ message: 'Note added successfully', note: newNote });
});

// delete function that listens for the id assigned above and deletes it when the user selects that. 
app.delete('/api/notes/:id', (req, res) => {
  const notes = dbTools.getData();

  const noteIndex = notes.findIndex((value) => value.id === req.params.id);
if (noteIndex === -1) {
  res.json( {message: 'No id found'});
  return 
}
// cuts the note index at the right number and then writes the data once more. 
notes.splice(noteIndex, 1);
dbTools.writeData(notes);

res.json({message: 'Note removed successfully'})
})

// Start the server and listen on port 3333
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

