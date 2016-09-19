'use strict';
var express = require('express')
var app = express();
var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 3000;

var wordPath = path.join(__dirname, 'data/words.txt');
var imgPath = path.join(__dirname, 'public/img');

app.disable('x-powered-by');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/pres', function(req, res) {

  fs.readFile(wordPath, 'utf8', function(err, wordTxt) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var wordArr = wordTxt.split("\n");
    var imgArr = fs.readdirSync(imgPath);
    var slides = ['Hello.'];
    var numSlides = 10 + Math.random()*6;

    for (var i=0; i<numSlides; i++) {

      if (Math.random() < 0.3) {
        var word = wordArr[Math.floor(Math.random()*wordArr.length)];
        slides.push(word.charAt(0).toUpperCase() + word.slice(1));
      }
      else {
        slides.push('<img style="height: 50%" src="/img/' + imgArr[Math.floor(Math.random()*imgArr.length)]+'">');
      }
    }

    slides.push('Thank you.');
    res.render('deck', {slides: slides});
  });
});


app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port',port);
});
