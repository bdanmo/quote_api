const express = require('express');
const app = express();

app.get('/greetings', (req, res) => {
  res.json({ greeting: 'Yo, fuckas.' })
});


//send a GET request to /quotes to READ a list of quotes
//send a GET request to /quote/:id to READ a quote
//send a POST request /quotes to CREATE a new quote
//send a PUT request /quotes/:id to UPDATE a quote
//send a DELETE request to quotes/:id to DELETE a quote
//send a GET request to /quotes/quote/random READ a random quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'));
