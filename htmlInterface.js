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
  const containerElement = document.createElement('div');
  createInfo(text);
  appElement.appendChild(containerElement);
  const promise = new Promise((resolve) => {
    const choiceButtons = [];
    choices.forEach(({ id, label }, index) => {
      const choiceButton = document.createElement('button');
      choiceButton.textContent = label;
      const eventListener = () => {
        choiceButton.removeEventListener('click', eventListener);
        appElement.removeChild(containerElement);
        const choiceValueElement = document.createElement('div');
        choiceValueElement.textContent = label;
        appElement.appendChild(choiceValueElement);
        resolve(id);
      };
      choiceButton.addEventListener('click', eventListener);
      choiceButtons.push(choiceButton);
      containerElement.appendChild(choiceButton);
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
    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: document.body.getBoundingClientRect().height,
    });
    document.getElementById('bottom').scrollTo({ behavior: 'smooth' });
  }
}
getInputs();
