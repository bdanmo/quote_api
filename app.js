const express = require('express');
const app = express();

const records = require('./records');

app.use(express.json());

//send a GET request to /quotes to READ a list of quotes
app.get('/quotes', async (req, res) => {
  try {
    const quotes = await records.getQuotes();
    res.json(quotes);
  } catch (err) {
    res.json({message: err.message})
  }
});

//send a GET request to /quote/:id to READ a quote
app.get('/quotes/:id', async (req, res) => {
  try {
    const quote = await records.getQuote(req.params.id);
    res.json(quote);
  } catch (err) {
      res.json({message: err.message})
  }
});

//send a POST request /quotes to CREATE a new quote
app.post('/quotes', async (req, res) => {
  try {
    const quote = await records.createQuote({
      quote: req.body.quote,
      author: req.body.author
    });
    res.status(201).json(quote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
});

//send a PUT request /quotes/:id to UPDATE a quote
//send a DELETE request to quotes/:id to DELETE a quote
//send a GET request to /quotes/quote/random READ a random quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'));


