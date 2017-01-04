'use strict';

/* eslint-env node */

const path = require('path');
const fs = require('fs');

const wordPath = path.join(__dirname, 'data/words.txt');
const imgPath = path.join(__dirname, 'public/img');
let readWords = [];
let wordArray = [];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

const lib = {
  greetings: shuffleArray([
    'hello', 'welcome', 'hi', 'hello', 'welcome', 'question:'
  ]),
  goodbye: shuffleArray([
    'goodbye', 'the end', 'fin', 'thank you', 'thanks', 'thank you.'
  ]),
  getGreeting: () => this.capFirst(this.greetings[Math.floor(Math.random() * this.greetings.length)]),
  getGoodbye: () => this.capFirst(this.goodbye[Math.floor(Math.random() * this.goodbye.length)]),
  getImg: () => {
    if (imgArray.length === 0) {
      imgArray = this.initImages();
    }
    return imgArray.pop();
  },
  getWord: () => {
    if (wordArray.length === 0) {
      wordArray = this.initWords();
    }
    return this.capFirst(wordArray.pop());
  },
  initWords: () => shuffleArray(readWords).slice(0),
  initImages: () => shuffleArray(fs.readdirSync(imgPath)),
  capFirst: str => str.split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
};


fs.readFile(wordPath, 'utf8', (err, wordTxt) => {
  if (err) {
    console.error(err.stack); // eslint-disable-line no-console
  }
  else {
    readWords = wordTxt.split('\n').filter(s => s.match(/[a-z]/i));
    wordArray = lib.initWords();
  }
});

let imgArray = lib.initImages();

module.exports = lib;
