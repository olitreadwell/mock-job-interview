'use strict';

/* eslint-env node */

const path = require('path');
const fs = require('fs');

const wordPath = path.join(__dirname, 'data/questions.txt');
let readWords;
let wordArray;

function shuffleArray(arr)
{
  for (let i = arr.length - 1; i > 0; i--)
  {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

const greetings = shuffleArray([
  'hello', 'welcome', 'hi',
]);

const goodbye = shuffleArray([
  'goodbye', 'thank you', 'thanks',
]);

const lib = {
  getGreeting()
  {
    return this.capFirst(greetings[Math.floor(Math.random() * greetings.length)]);
  },
  getGoodbye()
  {
    return this.capFirst(goodbye[Math.floor(Math.random() * goodbye.length)]);
  },
  getWord()
  {
    if (wordArray.length === 0)
    {
      wordArray = this.initWords();
    }
    return this.capFirst(wordArray.pop());
  },
  initWords: () => shuffleArray(readWords)
    .slice(0),
  capFirst: str => str.split(' ')
    .map(s => s.charAt(0)
      .toUpperCase() + s.slice(1))
    .join(' ')
};


fs.readFile(wordPath, 'utf8', (err, wordTxt) =>
{
  if (err)
  {
    console.error(err.stack); // eslint-disable-line no-console
  }
  else
  {
    readWords = wordTxt.split('\n')
      .filter(s => s.match(/[a-z]/i));
    wordArray = lib.initWords();
  }
});

module.exports = lib;
