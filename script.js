let numberA, numberB, operator

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

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    console.log(button.className);
  })
})