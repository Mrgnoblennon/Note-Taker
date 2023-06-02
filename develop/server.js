const express = require('express');
const path = require('path');

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

//default route 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
