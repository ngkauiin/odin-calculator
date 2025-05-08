let numberA = 0;
let numberB = 0;
let operator;
let input = '';

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
  switch(operator) {
    case '+':
      return add(a,b);
    case '-':
      return subtract(a,b);
    case '*':
      return multiply(a,b);
    case '/':
      return divide(a,b);
  }
}

function display(content) {
  const displayDiv = document.querySelector('.display');
  displayDiv.textContent = content;
}

let numberOfOperatorCount = 0;

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if(checkIfOperators(button.className)) {
      numberOfOperatorCount++;
      if(numberOfOperatorCount === 1) {
        numberA = parseInt(input);
        operator = button.className;
        input = '';
      } else if (numberOfOperatorCount === 2) {
        if(!numberA) numberA = 0;
        numberB = parseInt(input);
        display(operate(numberA,numberB,operator));
        numberOfOperatorCount = 0;
      }
    } else {
      input += button.className;
    }
    if(numberOfOperatorCount===2) console.log(`TWO OPERATORS - ${numberA} ${operator} ${numberB}`);
  })
})

function checkIfOperators(input) {
  const operators = '+-*/=';
  return operators.split('').some((operator) => operator === input);
}