let currentInput = "0";
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

function handleButtonClick(event) {
  const value = event.target.textContent;

  if (value === "AC") {
    clearCalculator();
  } else if (value === "=") {
    calculateResult();
  } else if (value === ".") {
    handleDecimal();
  } else {
    handleInput(value);
  }
}

function clearCalculator() {
  currentInput = "0";
  updateDisplay();
}

function handleInput(value) {
  // If the current input is 0 (or the initial state), replace it with the value clicked
  if (currentInput === "0" && value !== ".") {
    currentInput = value;
  } else {
    currentInput += value;
  }
  updateDisplay();
}

function handleDecimal() {
  // Prevent adding another decimal point if there's already one in the current number
  // We only check for the last part of the input (last number entered)
  const lastNumber = currentInput.split(/[\+\-\*\/]/).pop();
  if (!lastNumber.includes(".")) {
    currentInput += ".";
  }
  updateDisplay();
}

function calculateResult() {
  // Filter the input using regex to avoid consecutive operators and invalid characters
  const filtered = currentInput.match(/(\*|\+|\/|-)?(\.|\-)?\d+/g);

  if (filtered) {
    const expression = filtered.join("");
    try {
      const sum = eval(expression);
      currentInput = sum.toString();
    } catch (error) {
      currentInput = "Error";
    }
  } else {
    currentInput = "Error";
  }
  updateDisplay();
}

function updateDisplay() {
  display.textContent = currentInput;
}
