let numberA, numberB, operator;
let input = '';
const digits = '1234567890';
const operators = '+-*/=';

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