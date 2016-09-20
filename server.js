'use strict';
var express = require('express')
var app = express();
var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 3000;

var wordPath = path.join(__dirname, 'data/words.txt');
var imgPath = path.join(__dirname, 'public/img');
var greetings = shuffleArray([
  'hello', 'welcome', 'hi', 'hello', 'welcome', 'question:'
]);
var goodbye = shuffleArray([
  'goodbye', 'the end', 'fin', 'thank you', 'thanks', 'thank you.'
]);

app.disable('x-powered-by');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/pres', function(req, res) {

  fs.readFile(wordPath, 'utf8', function(err, wordTxt) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var wordArr = shuffleArray(wordTxt.split("\n"));
    var imgArr = shuffleArray(fs.readdirSync(imgPath));
    var title = capFirst(wordArr.pop());
    var slides = [capFirst(greetings.pop())];
    var numSlides = 10 + Math.random()*6;

    for (var i=0; i<numSlides; i++) {

      if (Math.random() < 0.3) {
        slides.push(capFirst(wordArr.pop()));
      }
      else {
        slides.push('<img src="/img/' + imgArr.pop()+'">');
      }
    }

    slides.push(capFirst(goodbye.pop()));
    res.render('deck', {slides: slides, title: title});
  });
});


app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port',port);
});

function capFirst(str) {
  var words = str.split(' ');
  words = words.map(function(s) { return s.charAt(0).toUpperCase() + s.slice(1) });
  return words.join(' ');
}

function shuffleArray(arr) {
    for (var i=arr.length-1; i>0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
