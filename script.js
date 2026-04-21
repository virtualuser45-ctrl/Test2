const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

let currentInput = '0';
let operator = null;
let previousInput = '';
let resetDisplay = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function handleNumberClick(value) {
    if (resetDisplay) {
        currentInput = value;
        resetDisplay = false;
    } else {
        currentInput = currentInput === '0' ? value : currentInput + value;
    }
    updateDisplay();
}

function handleDecimalClick(value) {
    if (resetDisplay) {
        currentInput = '0.';
        resetDisplay = false;
    } else if (!currentInput.includes('.')) {
        currentInput += value;
    }
    updateDisplay();
}

function handleOperatorClick(value) {
    if (operator && !resetDisplay) {
        calculateResult();
    }
    previousInput = currentInput;
    operator = value;
    resetDisplay = true;
}

function handleClearClick() {
    currentInput = '0';
    operator = null;
    previousInput = '';
    resetDisplay = false;
    updateDisplay();
}

function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero!");
                handleClearClick();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    resetDisplay = true;
    updateDisplay();
}

buttons.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.matches('button')) return;

    const value = target.dataset.value;
    const action = target.dataset.action;

    if (action === 'clear') {
        handleClearClick();
    } else if (action === 'equals') {
        calculateResult();
    } else if (target.classList.contains('number')) {
        handleNumberClick(value);
    } else if (target.classList.contains('operator')) {
        handleOperatorClick(value);
    } else if (target.classList.contains('decimal')) {
        handleDecimalClick(value);
    }
});

updateDisplay();
