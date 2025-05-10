function add(a,b) {
  return a+b;
}

function subtract(a,b) {
  return a-b;
}

function multiply(a,b) {
  return a*b;
}

function divide(a,b) {
  return a/b;
}

function operate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch(operator) {
    case '+':
      return add(a,b);
    case '-':
      return subtract(a,b);
    case 'x':
      return multiply(a,b);
    case '/':
      if(b===0) {
        return false;
      } else {
        return divide(a,b);
      }
  }
}

function display(content) {
  const displayDiv = document.querySelector('.display');
  displayDiv.textContent = content;
}


let content = '';
let toDecimal = 7;

let currentNumber = '0';

let storage = {
  numberA: '0',
  numberB: '0',
  operator: '',
  stage: 0,
  dotExisted: false,
}

clearAll();

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const userInput = button.className;
    if(userInput==='c') return clearAll();
    if((userInput==='=') && !storage.operator) return;  // ignore '=' at the very beginning
    if((userInput==='backspace' && (storage.stage === 1 || storage.stage === 3))) return; // if there is no number to be backspace, do nothing

    switch (storage.stage) {
      case 0: // get first number A
        if(isNumber(userInput)) {
          currentNumber += userInput;
          content = createContentAs('numA');
        } else if(userInput==='.') {
          if(!storage.dotExisted) {
            currentNumber_Dot();
            content = createContentAs('numA') + '.';
          }
        } else if(userInput==='backspace') {
          if (currentNumber.at(-1) === '.') storage.dotExisted = false;
          if (parseFloat(currentNumber).toString().length > 1) {
            backspaceOneNumber();
          } else {
            storage.dotExisted = false;
            currentNumber = '0'
            content = createContentAs('numA');
          }
        } else {
          saveToNumber('A',currentNumber);
          saveLastOperator(userInput);
          moveStage(1);
          content = createContentAs('numA+');
        }
        break;
      case 1: // get operator
        if(isNumber(userInput)) {
          currentNumber += userInput;
          moveStage(2);
          content = createContentAs('numA+numB');
        } else if(userInput==='.') {
          if(!storage.dotExisted) {
            currentNumber_Dot();
            content = createContentAs('numA+numB') + '.';
          }
        } else {
          saveLastOperator(userInput);
          content = createContentAs('numA+');
        }
        break;
      case 2: // get second number B
        if(isNumber(userInput)) {
          currentNumber += userInput;
          content = createContentAs('numA+numB')
        } else if (userInput==='.'){
          if(!storage.dotExisted) {
            currentNumber_Dot();
            content = createContentAs('numA+numB') + '.';
          }
        } else if (userInput==='backspace') {
          if (currentNumber.at(-1) === '.') storage.dotExisted = false;
          if (parseFloat(currentNumber).toString().length> 1) {
            backspaceOneNumber();
          } else {
            currentNumber = '0'
            content = createContentAs('numA+numB')
          }
        } else {
          saveToNumber('B',currentNumber);
          const result = operate(storage.numberA,storage.numberB,storage.operator);
          if(result===false) {
            dividedByZero();
            return;
          } else {
            saveToNumber('A',result+'');
            content = createContentAs('result');
          }
          if(userInput!=='=') {
            saveLastOperator(userInput);
            content = createContentAs('numA+');
            saveToNumber('B','0');
            moveStage(1);
          } else if (userInput==='=') {
            moveStage(3);
          }
        }
        break;
      case 3: // transition after '='
        if (isNumber(userInput)) {
          currentNumber += userInput;
          moveStage(0);
          content = createContentAs('numA');
        } else if (userInput==='.'){
          if(!dotExisted) {
            currentNumber_Dot();
            moveStage(0);
            content = createContentAs('numA')+'.';
          }
        } else {
          if (userInput === '=') {
            const result = operate(storage.numberA,storage.numberB,storage.operator);
            if(result===false) {
              dividedByZero();
              return;
            } else {
              saveToNumber('A',result+'');
              content = createContentAs('result');
            }
          } else {
            saveLastOperator(userInput);
            content = createContentAs('numA+');
            saveToNumber('B','0');
            moveStage(1);
          }
        }
        break;
    }
    display(content);
  })
})

function clearAll() {
  storage = {
    numberA: '0',
    numberB: '0',
    operator: '',
    stage: 0,
    dotExisted: false,
  }
  content = storage.numberA;
  display(storage.numberA);
}

function saveLastOperator(input) {
  if(input!=='=') storage.operator = input;
}

function roundNumberTo(num, precision) {
  let multiplier = Math.pow(10, precision || 0);
  return Math.round(num*multiplier)/multiplier;
}

function isNumber(userInput) {
  if(parseFloat(userInput) || parseFloat(userInput) === 0) return true
}

function dividedByZero() {
  clearAll();
  display('CANNOT DIVIDED BY ZERO');
}

function currentNumber_Dot() {
  storage.dotExisted = true;
  currentNumber += '.';
}

function saveToNumber(index, value) {
  const numberIndex = 'number'+index;
  storage[numberIndex] = value;
  storage.dotExisted = false;
  currentNumber = '0';
}

function moveStage(stageNumber) {
  switch(stageNumber) {
    case 0:
      storage.numberB = '0';
      storage.operator = '';
      storage.stage = 0;
      return;
    case 1:
      storage.stage = 1;
      return;
    case 2:
      storage.stage = 2;
      return;
    case 3:
      storage.stage = 3;
      return;      
  }
}

function createContentAs(contentCode) {
  switch(contentCode) {
    case 'numA':
      return parseFloat(currentNumber)+'';
    case 'numA+':
      return parseFloat(storage.numberA)+storage.operator+'';
    case 'numA+numB':
      return parseFloat(storage.numberA)+storage.operator+parseFloat(currentNumber)+'';
    case 'result':
      return roundNumberTo(storage.numberA,toDecimal)+'';
  }
}

function backspaceOneNumber() {
  currentNumber = currentNumber.slice(0,-1);
  content = content.slice(0,-1);
}