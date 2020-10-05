/* global require */
/* eslint-disable no-console */
const prompt = require('prompt-sync')();

const { play } = require('./oregonTrail');

const game = play();
let input;
while (true) {
  const { done, value: output } = game.next(input);
  if (done) {
    break;
  }

  switch (output.type) {
    case play.PROMPT_TYPE.CHOICE: {
      console.log(output.text);
      input = prompt();
      break;
    }
    case play.PROMPT_TYPE.NUMERIC: {
      input = prompt(output.text);
      break;
    }
    case play.PROMPT_TYPE.STRING: {
      input = prompt(output.text);
      break;
    }
    case play.PROMPT_TYPE.NONE:
    default: {
      console.log(output.text);
      input = undefined;
      break;
    }
  }
}
