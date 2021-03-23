const express = require('express');
const app = express();

app.get('/greetings', (req, res) => {
  res.json({ greeting: 'Yo, fuckas.' })
});

//send a POST request to CREATE a new quote
//send a GET request to READ a quote
//send a PUT request to UPDATE a quote
//send a DELETE request to DELETE a quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'));
