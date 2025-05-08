let numberA = '';
let numberB = '';
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

let stage = 0;

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const userInput = button.className;
    // check if input is digit number, if so then add that to numberA (stage 0)
    // if the input changed to operator, keep the numberA and store the operator (stage 0>1)
    // if the following input is also operator, keep changing the operator (stage 1)
    // if the following input is a digit number, store the operator and start storing that input as numberB (stage 1>2)
    // if the following input is a operator, keep the numberB (stage 2>3)
    // in stage 3, operate the math and display the value on HTML (stage 3>0)
    switch (stage) {
      case 0:
        if(parseInt(userInput)) {
          numberA += userInput;
        } else {
          operator = userInput;
          stage++;
        }
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  })
})
