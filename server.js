'use strict';

/* eslint-env node */
/* eslint no-magic-numbers: off */
/* eslint no-console: off */

const express = require('express');
const app = express();
const lib = require('./server-lib');

const port = process.env.PORT || 3000; // eslint-disable-line no-magic-numbers

app.disable('x-powered-by');
app.use(express.static('public'));
app.set('view engine', 'ejs');

const params = {
  l:
  {
    size: 20,
    variance: 10,
    auto: 15000
  },
  s:
  {
    size: 5,
    variance: 2,
    auto: 15000
  },
  '⚡':
  {
    size: 20,
    variance: 0,
    auto: 15000
  },
  default:
  {
    size: 10,
    variance: 6,
    auto: 15000
  }
};

app.get('/pres/:size?', (req, res) =>
{
  const size = req.params.size;
  const baseNum = size in params ? params[size].size : params.default.size;
  const variance = size in params ? params[size].variance : params.default.variance;
  const autoslide = size in params ? params[size].auto : 0;
  const numSlides = baseNum + (Math.random() * variance);

  const title = "Mock Interview"
  const slides = [lib.getWord()];

  for (let i = 0; i < numSlides; i++)
  {
    slides.push(lib.getWord());
  }

  slides.push(lib.getGoodbye());
  slides.push('<a class="restart" href="/pres">New Mock Interview</a>');
  res.render('deck',
  {
    slides,
    title,
    autoslide
  });
});

app.use((req, res) =>
{
  res.sendStatus(404);
});

app.listen(port, () =>
{
  console.log('Listening on port', port);
});
