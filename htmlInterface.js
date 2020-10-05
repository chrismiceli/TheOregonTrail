/* global play */
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
  const promise = new Promise((resolve) => {
    const choiceButtons = [];
    choices.forEach((choice, index) => {
      const choiceButton = document.createElement('button');
      choiceButton.textContent = choice;
      const eventListener = () => {
        choiceButton.removeEventListener('click', eventListener);
        for (const choiceButtonToRemove of choiceButtons) {
          appElement.removeChild(choiceButtonToRemove);
        }
        const choiceValueElement = document.createElement('div');
        choiceValueElement.textContent = choice;
        appElement.appendChild(choiceValueElement);
        resolve(choice);
      };
      choiceButton.addEventListener('click', eventListener);
      choiceButtons.push(choiceButton);
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
  const promise = new Promise((resolve) => {
    const formElement = document.createElement('form');
    const numberInput = document.createElement('input');
    if (type) {
      numberInput.setAttribute('type', type);
    }
    const enterButton = document.createElement('button');
    enterButton.textContent = 'ENTER';
    const eventListener = (event) => {
      enterButton.removeEventListener('click', eventListener);
      formElement.removeEventListener('submit', eventListener);
      const { value } = numberInput;
      resolve(value);
      formElement.removeChild(numberInput);
      formElement.removeChild(enterButton);
      const numberValueElement = document.createElement('div');
      numberValueElement.textContent = value;
      formElement.appendChild(numberValueElement);
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
function getInputs(input) {
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
