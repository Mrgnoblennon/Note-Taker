const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.static('public'));
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


//add routes


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port https://localhost:${PORT}`);
});
