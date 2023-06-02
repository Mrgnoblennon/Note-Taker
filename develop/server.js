const express = require('express');
const path = require('path');
const fs = require('fs');

// added new framework to id each note
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 3023;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serve static files from the "public" directory
app.use(express.static('public'));

//notes route
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

//read existing notes from db.json with GET request
app.get('/api/notes', (req, res) => {

//read contents of db.json
fs.readFile('db/db.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to read notes data.' });
  }

  //parse data
  const notes = JSON.parse(data);

  //send notes as a json response
  res.json(notes);
});
});

//write new note to db.json with POST request
app.post('/api/notes', (req, res) => {

//read contents of db.json
fs.readFile('db/db.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to read notes data.' });
  }

  //parse data
  const notes = JSON.parse(data);

  //create new note object with an id
  const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };

  //add new notes to array
  notes.push(newNote);

  //write new notes back to db.json
  fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to write note.' });
    }

    //send a json response with newly created note
    res.json(newNote);
  });
});
});

//need DELETE request

//default route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
