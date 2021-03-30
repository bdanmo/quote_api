const express = require('express');
const app = express();

const records = require('./records');

app.use(express.json());

//send a GET request to /quotes to READ a list of quotes
app.get('/quotes', async (req, res) => {
  const quotes = await records.getQuotes();
  res.json(quotes);
});

//send a GET request to /quote/:id to READ a quote
app.get('/quotes/:id', async (req, res) => {
  const quote = await records.getQuote(req.params.id);
  res.json(quote);
});

//send a POST request /quotes to CREATE a new quote
app.post('/quotes', (req, res) => {
  const quote = records.createQuote({
    quote: req.body.quote,
    author: req.body.author
  });
});

//send a PUT request /quotes/:id to UPDATE a quote
//send a DELETE request to quotes/:id to DELETE a quote
//send a GET request to /quotes/quote/random READ a random quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'));


