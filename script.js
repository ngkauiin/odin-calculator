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
      return multiply(a,b);
  }
}

function display(content) {
  const displayDiv = document.querySelector('.display');
  displayDiv.textContent = content;
}

let count = 0;

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if(checkIfOperators(button.className)) {
      if(count === 0) {
        numberA = parseInt(input);
        operator = button.className;
        input = '';
      } else if (count === 1) {
        numberB = parseInt(input);
        display(operate(numberA,numberB,operator));
      }
      count++;
    }
    if(count===2) console.log(`TWO OPERATORS - ${numberA} ${operator} ${numberB}`);
    input += button.className;
  })
})

// 111+111=
// If the input is one of the operator then count++
// If count === 2, then operate and display
// Else if the input is one of the digits, then continue to add onto input

function checkIfOperators(input) {
  const operators = '+-*/=';
  return operators
              .split('')
              .some((operator) => operator === input);
}