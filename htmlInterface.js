function createInfo(text) {
  const textElement = document.createElement('div');
  const appElement = document.getElementById('app');
  textElement.textContent = text;
  textElement.className = 'text';
  appElement.appendChild(textElement);
}

function createChoice(text, choices) {
  const appElement = document.getElementById('app');
  createInfo(text);
  const promise = new Promise(resolve => {
    choices.forEach((choice, index) => {
      const choiceButton = document.createElement('button');
      choiceButton.textContent = choice;
      let eventListener = () => {
        choiceButton.removeEventListener('click', eventListener);
        resolve(choice);
      };
      choiceButton.addEventListener('click', eventListener);
      appElement.appendChild(choiceButton);
      if (index === 0) {
        choiceButton.focus();
      }
    });
  });

  return promise;
}

function createInput(text, type) {
  const appElement = document.getElementById('app');
  createInfo(text);
  const promise = new Promise(resolve => {
    const formElement = document.createElement('form');
    const numberInput = document.createElement('input');
    if (type) {
      numberInput.setAttribute('type', type);
    }
    const enterButton = document.createElement('button');
    enterButton.textContent = 'ENTER';
    let eventListener = event => {
      enterButton.removeEventListener('click', eventListener);
      formElement.removeEventListener('submit', eventListener);
      resolve(numberInput.value);
      event.preventDefault();
    };
    formElement.addEventListener('submit', eventListener);
    enterButton.addEventListener('click', eventListener);
    formElement.appendChild(numberInput);
    formElement.appendChild(enterButton);
    appElement.appendChild(formElement);
    numberInput.focus();
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
        promise = createInput(output.text, 'number');
        break;
      }
      case play.PROMPT_TYPE.STRING: {
        promise = createInput(output.text);
        break;
      }
      case play.PROMPT_TYPE.NONE:
      default: {
        createInfo(output.text);
        promise = Promise.resolve();
        break;
      }
    }
    promise.then(getInputs);
    document.getElementById('bottom').scrollIntoView();
  }
}
getInputs();