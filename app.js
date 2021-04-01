const { json } = require('express');
const express = require('express');
const app = express();

const records = require('./records');

app.use(express.json());

//send a GET request to /quotes to READ a list of quotes
app.get('/quotes', async (req, res, next) => {
  try {
    const quotes = await records.getQuotes();
    res.json(quotes);
  } catch (err) {
    next(err);
  }
});

//send a GET request to /quote/:id to READ a quote
app.get('/quotes/:id', async (req, res, next) => {
  try {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
      res.json(quote);
    } else {
      res.status(404).json({ message: 'Quote not found.' });
    }
  } catch (err) {
    next(err);
  }
});

//send a POST request /quotes to CREATE a new quote
app.post('/quotes', async (req, res, next) => {
  try {
    if (req.body.author && req.body.quote) {
      const quote = await records.createQuote({
        quote: req.body.quote,
        author: req.body.author
      });
      res.status(201).json(quote);
    } else {
      res.status(400).json({message: "Bad request. Must provide author and quote."})
    }
  } catch (err) {
    next(err);
  }
  
});

//send a PUT request /quotes/:id to UPDATE a quote
app.put('/quotes/:id', async (req, res, next) => {
  try {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
      quote.quote = req.body.author;
      quote.author = req.body.quote;
      await records.updateQuote(quote);
      res.status(204).end();
    } else {
      res.status(404).json({message: 'Quote was not found.'})
    }
  } catch (err) {
    next(err);
  }
  
});
//send a DELETE request to quotes/:id to DELETE a quote
app.delete('/quotes/:id', async (req, res, next) => {
  try {
    throw new Error("Shit just hit the fan.");
    const quote = await records.getQuote(req.params.id);
    if (quote) {
      await records.deleteQuote(quote);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "There's no quote to delete!" });
    }
  } catch (err) {
    next(err);
  }
})
//send a GET request to /quotes/quote/random READ a random quote

//catch requests sent to non-existent routes
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  })
});

app.listen(3000, () => console.log('Quote API listening on port 3000!'));


