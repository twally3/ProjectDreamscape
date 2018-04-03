const express = require('express');
const { join } = require('path');

const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(
    join(__dirname, 'public', 'index.html')
  );
});

const PORT = 8080;
app.listen(PORT, _ => `Listening on port ${PORT}`);