'use strict';
var express = require('express')
var app = express();
var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 3000;

var wordPath = path.join(__dirname, 'data/words.txt');
var imgPath = path.join(__dirname, 'public/img');
var readWords = [];
var wordArray = [];

fs.readFile(wordPath, 'utf8', function(err, wordTxt) {
  if (err) {
    console.error(err.stack);
    return res.sendStatus(500);
  }
  readWords = wordTxt.split("\n").filter(function(s){return s.match(/[a-z]/i)});
  wordArray = initWords();
});

var imgArray = initImages();
var greetings = shuffleArray([
  'hello', 'welcome', 'hi', 'hello', 'welcome', 'question:'
]);
var goodbye = shuffleArray([
  'goodbye', 'the end', 'fin', 'thank you', 'thanks', 'thank you.'
]);

app.disable('x-powered-by');
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/pres/:size?', function(req, res) {
  var size = req.params.size;
  var baseNum = (size==='l')?20:(size==='s')?5:10;
  var variance = (size==='l')?10:(size==='s')?2:6;
  var numSlides = baseNum + Math.random()*variance;

  var title = getWord();
  var slides = [getGreeting()];

  for (var i=0; i<numSlides; i++) {

    if (Math.random() < 0.3) {
      slides.push(getWord());
    }
    else {
      slides.push('<img src="/img/' + getImg() +'">');
    }
  }

  slides.push(getGoodbye());
  slides.push('<a class="restart" href="/pres">New Randomized Presentation</a>');
  res.render('deck', {slides: slides, title: title});

});


app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port',port);
});

function initWords() {
  return shuffleArray(readWords).slice(0);
}

function initImages() {
  return shuffleArray(fs.readdirSync(imgPath));
}

function getWord() {
  if (wordArray.length === 0) {
    wordArray = initWords();
  }
  return capFirst(wordArray.pop());
}

function getImg() {
  if (imgArray.length === 0) {
    imgArray = initImages();
  }
  return imgArray.pop();
}

function capFirst(str) {
  return str.split(' ')
    .map(function(s) { return s.charAt(0).toUpperCase() + s.slice(1) })
    .join(' ');
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

function getGreeting() {
  return capFirst(greetings[Math.floor(Math.random()*greetings.length)]);
}

function getGoodbye() {
  return capFirst(goodbye[Math.floor(Math.random()*goodbye.length)]);
}
