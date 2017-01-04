'use strict';

/* eslint-env node */
/* eslint no-magic-numbers: off */
/* eslint no-console: off */
/* eslint no-nested-ternary: off */

const express = require('express');
const app = express();
const lib = require('./server-lib');

const port = process.env.PORT || 3000; // eslint-disable-line no-magic-numbers

app.disable('x-powered-by');
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/pres/:size?', (req, res) => {
  const size = req.params.size;
  const baseNum = (size === 'l') ? 20 : (size === 's') ? 5 : 10;
  const variance = (size === 'l') ? 10 : (size === 's') ? 2 : 6;
  const numSlides = baseNum + (Math.random() * variance);

  const title = lib.getWord();
  const slides = [lib.getGreeting()];

  for (let i = 0; i < numSlides; i++) {
    if (Math.random() < 0.3) {
      slides.push(lib.getWord());
    }
    else {
      slides.push(`<img src="/img/${lib.getImg()}">`);
    }
  }

  slides.push(lib.getGoodbye());
  slides.push('<a class="restart" href="/pres">New Randomized Presentation</a>');
  res.render('deck', {
    slides,
    title
  });
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});
