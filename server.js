
const express = require('express');
const funData = require('./db/db.json');
const dbTools = require('./db')

const app = express();
// middleware channel
app.use(express.static('./public'));
app.use(express.json());


// Sample data (in-memory database)
let notes = [];

// Route to handle GET requests
app.get('/api/notes', (req, res) => {
    // Send the notes as JSON response
    res.json(notes);
});

// Route to handle POST requests
app.post('/api/notes', (req, res) => {
    // Get the new note data from the request body
    const newNote = req.body;

    // Add the new note to the notes array
    notes.push(newNote);

    // Send a success message as JSON response
    res.json({ message: 'Note added successfully', note: newNote });
});

// Start the server and listen on port 3333
app.listen(3333, () => console.log('Server started on port 3333'));











// // Returns object by type
// app.get('/api/notes', (clientRequestObj, serverResponseObj) => {
//   const funData = dbTools.getData();
//   const funThing = clientRequestObj.params.funThing;

//   const obj = funData.find(funObj => funObj.type === funThing);

//   if (obj) {
//     return serverResponseObj.json(obj);
//   }

//   serverResponseObj.json({
//     message: 'Type of that name was not found.'
//   });

// });


// app.get('/api/notes', (clientRequestObj, serverResponseObj) => {
//   const funData = dbTools.getData();
//   serverResponseObj.json(funData);
// });

// app.post('/api/notes', (clientRequestObj, serverResponseObj) => {
//   const funData = dbTools.getData();

//   funData.push(clientRequestObj.body);
//   dbTools.writeData(funData);

//   serverResponseObj.json({
//     message: 'DB updated successfully'
//   })
// });
