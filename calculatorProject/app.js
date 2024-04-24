const screenDisplay = document.querySelector('#screen');
const mainContainer = document.querySelector('#mainContainer');
const buttons = document.querySelectorAll('button');
const specialButtons = document.querySelectorAll('.special-button');
const numButtons = document.querySelectorAll('.special-button1');
const operandButtons = document.querySelectorAll('.special-button2');
const themeToggleBtn = document.querySelector('.theme-toggler');
const calculator = document.querySelector('.dark');
const toggleIcon = document.querySelector('.toggler-icon');

let calculation = [];

function calculate(button) {
    const value = button.textContent;

    if (value === 'AC') {
        calculation = [];
    } else if (value === 'DEL') {
        calculation.pop();
    } else if (value === '=') {
        const result = evaluateCalculation();
        screenDisplay.textContent = result;
        calculation = [result];
    } else if (value === '%') {
        applyPercentage();
    } else {
        if (calculation.length < 20) {
            calculation.push(value);
        } else {
            calculation.push('\n' + value);
        }
    }

    updateDisplay();
}

function evaluateCalculation() {
    try {
        return eval(calculation.join(''));
    } catch (error) {
        return 'Error';
    }
}

function applyPercentage() {
    let expression = calculation.join('');
    const lastOperatorIndex = Math.max(expression.lastIndexOf('+'), expression.lastIndexOf('-'), expression.lastIndexOf('*'), expression.lastIndexOf('/'));
    if (lastOperatorIndex !== -1) {
        const lastNumber = expression.substring(lastOperatorIndex + 1);
        expression = expression.substring(0, lastOperatorIndex + 1) + `(${lastNumber}/100)`;
    } else {
        expression = `(${expression}/100)`;
    }
    calculation = [expression];
}

function updateDisplay() {
    const displayText = calculation.join('');
    screenDisplay.textContent = displayText;
    adjustFontSize(displayText);
}

function adjustFontSize(displayText) {
    const lines = displayText.split('\n');
    const numLines = lines.length;
    const fontSize = numLines > 3 ? 15 : 15; 
    screenDisplay.style.fontSize = fontSize + 'px';
}

buttons.forEach(button => button.addEventListener('click', () => calculate(button)));

themeToggleBtn.addEventListener('click', () => {
    // Change background color of mainContainer and screen based on theme
    if (mainContainer.style.backgroundColor === 'white') {
      mainContainer.style.backgroundColor = 'rgb(24, 24, 24)';
      mainContainer.style.transition = 'all 400ms';
      screenDisplay.style.backgroundColor = '#26282A';
      screenDisplay.style.transition = 'all 400ms';
      screenDisplay.style.border = '1px solid lightgrey';
      screenDisplay.style.color = 'white';
      themeToggleBtn.style.backgroundColor = '#0000004e';
      toggleIcon.style.transform ='translate(80%, -5%)';
      specialButtons.forEach(button => {
        button.style.backgroundColor = 'lightgrey';
      });
      
    } else {
      mainContainer.style.backgroundColor = 'white';
      mainContainer.style.transition = 'all 400ms';
      screenDisplay.style.backgroundColor = '#0000004e';
      screenDisplay.style.color = 'black';
      screenDisplay.style.transition = 'all 400ms';
      themeToggleBtn.style.backgroundColor = '#0000004e';
      toggleIcon.style.transform ='translate(-45%, -5%)';
      specialButtons.forEach(button => {
        button.style.backgroundColor = 'rgba(128, 0, 128, 0.181)';
      });
      specialButtons.forEach(button => {
        button.onmouseover = () => {
          button.style.background = '#93BAFF';
          button.style.transform = 'scale(1.05)'; 
        };
        button.onmouseout = () => {
          button.style.background = 'lightgrey';
          button.style.transform = 'scale(1.0)'; 
        };
      });
      
      numButtons.forEach(button => {
        button.onmouseover = () => {
          button.style.background = '#FFFDD0';
          button.style.transform = 'scale(1.05)'; 
        };
        button.onmouseout = () => {
          button.style.background = 'lightgrey';
          button.style.transform = 'scale(1.0)'; 
        };
      });

      operandButtons.forEach(button => {
        button.onmouseover = () => {
          button.style.transform = 'scale(1.05)'; 
        };
        button.onmouseout = () => {
          button.style.transform = 'scale(1.0)'; 
        };
      });
      
    }
  });

