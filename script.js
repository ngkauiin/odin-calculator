let numberA = '0';
let numberB = '0';
let operator = '';
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
    // (stage 0) check if input is digit number, if so then add that to numberA
    // (stage 0>1) if the input changed to operator, keep the numberA and store the operator 
    // (stage 1) if the following input is also operator, keep changing the operator
    // (stage 1>2) if the following input is a digit number, store the operator and start storing that input as numberB
    // (stage 2) if the following input is a operator, store the numberB
    // (stage 2) store the result as numberA, operate the math and display the value on HTML
    // (stage 2) check if last operator !== '=', save the last operator and clear numberB and move to stage 1
    // (stage 3) if operator==='=', go to stage 3
    // (stage 3) if the next input is digits, CLEAR and go to stage 0
    // (stage 3) if the next input is a oeprator (not =), clear numberB, store the operator and go to stage 1
    // (stage 3) if the next input is also '=', do the operate(a,b,x) and display with the previous operator

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
        if(!parseInt(userInput)) {
          operator = userInput;
        } else {
          numberB += userInput;
          stage++;
        }
        break;
      case 2:
        if(parseInt(userInput)) {
          numberB += userInput;
        } else {
          numberA = operate(numberA,numberB,operator);
          display(numberA);
          if(userInput!=='=') {
            operator = userInput;
            numberB = '0';
            stage = 1;
          } else if (userInput==='=') {
            stage = 3;
          }
        }
        break;
      case 3:
        if (parseInt(userInput)) {
          numberA = userInput;
          numberB = '0';
          operator = '';
          stage = 0;
        } else if (userInput === '=') {
          numberA = operate(numberA,numberB,operator);
          display(numberA);
        }
        break;
    }
  })
})
