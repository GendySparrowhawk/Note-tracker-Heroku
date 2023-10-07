

const express = require('express');
const path = require('path');
const app = express();
const dbTools = require('./db')
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3333;

app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));

});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));

});

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


app.get('/api/notes', (req, res) => {
  const noteData = dbTools.getData();
  res.json(noteData);

})

app.post('/api/notes', (req, res) => {
  const notes = dbTools.getData();
  const newNote = req.body;
  newNote.id = uuidv4();

  notes.push(newNote);
  dbTools.writeData(notes);

  res.json({ message: 'Note added successfully', note: newNote });
});

app.delete('/api/notes/:id', (req, res) => {
  const notes = dbTools.getData();

  const noteIndex = notes.findIndex((value) => value.id === req.params.id);
if (noteIndex === -1) {
  res.json( {message: 'No id found'});
  return 
}

notes.splice(noteIndex, 1);
dbTools.writeData(notes);

res.json({message: 'Note removed successfully'})
})

// Start the server and listen on port 3333
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

