function createChoice(text, choices) {
  const textElement = document.createElement('div');
  const appElement = document.getElementById('app');
  const promise = new Promise((resolve) => {
    textElement.textContent = text;
    appElement.appendChild(textElement);
    for (const choice of choices) {
      const choiceButton = document.createElement('button');
      choiceButton.textContent = choice;
      choiceButton.addEventListener('click', () => {
        resolve(choice);
      })
      appElement.appendChild(choiceButton);
    }
  });

  return promise;
}

const game = play();
let input;
function getInputs() {
  const { done, value: output } = game.next(input);
  if (!done) {
    let promise;
    switch (output.type) {
      case play.PROMPT_TYPE.CHOICE: {
        promise = createChoice(output.text, output.choices);
        break;
      }
      case play.PROMPT_TYPE.NUMERIC: {
        break;
      }
      case play.PROMPT_TYPE.STRING: {
        break;
      }
      case play.PROMPT_TYPE.NONE:
      default: {
        console.log(output.text);
        break;
      }
    }
    promise.then(getInputs);
  }
}
getInputs();