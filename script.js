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
  a = parseInt(a);
  b = parseInt(b);
  switch(operator) {
    case '+':
      return add(a,b);
    case '-':
      return subtract(a,b);
    case '*':
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

let stage = 0;
let numberA = '0';
let numberB = '0';
let operator = '';
let content = '';
let toDecimal = 7;

clearAll();

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const userInput = button.className;
    if(userInput==='c') return clearAll();
    if(userInput==='=' && !operator) return;
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
      case 0: // get first number
        if(isNumber(userInput)) {
          numberA += userInput;
          content = parseFloat(numberA)+'';
        } else {
          saveLastOperator(userInput);
          stage = 1;
          content = parseFloat(numberA)+userInput;
        }
        break;
      case 1: // get operator
        if(isNumber(userInput)) {
          numberB += userInput;
          stage = 2;
          content = parseFloat(numberA)+operator+parseFloat(numberB)+'';
        } else {
          saveLastOperator(userInput);
          content = content.slice(0,-1)+userInput;
        }
        break;
      case 2: // get second number
        if(isNumber(userInput)) {
          numberB += userInput;
          content = parseFloat(numberA)+operator+parseFloat(numberB)+'';
        } else {
          const result = operate(numberA,numberB,operator);
          if(result===false) {
            dividedByZero();
            return;
          } else {
            numberA = result+'';
            content = roundNumberTo(numberA,toDecimal)+'';
          }
          if(userInput!=='=') {
            saveLastOperator(userInput);
            content+=userInput;
            numberB = '0';
            stage = 1;
          } else if (userInput==='=') {
            stage = 3;
          }
        }
        break;
      case 3: // transition after '='
        if (isNumber(userInput)) {
          numberA = userInput;
          numberB = '0';
          operator = '';
          stage = 0;
          content = parseFloat(numberA)+'';
        } else {
          if (userInput === '=') {
            const result = operate(numberA,numberB,operator);
            if(result===false) {
              dividedByZero();
              return;
            } else {
              numberA = result+'';
              content = roundNumberTo(numberA,toDecimal)+'';
            }
          } else {
            saveLastOperator(userInput);
            content += userInput;
            numberB = '0';
            stage = 1;
          }
        }
        break;
    }
    display(content);
  })
})

function clearAll() {
  numberA = '0';
  numberB = '0';
  operator = '';
  content = numberA;
  stage = 0;
  display(numberA);
}

function saveLastOperator(input) {
  if(input!=='=') operator = input;
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