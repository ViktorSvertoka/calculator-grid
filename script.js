const buttons = document.querySelectorAll(".child");
const output = document.querySelector(".output");

let currentValue = "";
let previousValue = "";
let operator = "";
let isResultDisplayed = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("output")) return;

    const value = button.textContent;

    if (!isNaN(value) || value === ".") {
      handleNumber(value);
    } else if (value === "AC") {
      clearAll();
    } else if (value === "+/-") {
      toggleSign();
    } else if (value === "%") {
      applyPercentage();
    } else if (value === "=") {
      calculateResult();
    } else {
      handleOperator(value);
    }

    updateOutput();
  });
});

function handleNumber(value) {
  if (isResultDisplayed) return;
  if (currentValue.includes(".") && value === ".") return;
  currentValue += value;
}

function handleOperator(op) {
  if (currentValue === "" && !isResultDisplayed) return;

  if (isResultDisplayed) {
    isResultDisplayed = false;
  }

  if (previousValue && operator) {
    calculateResult();
  }

  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

function calculateResult() {
  if (!previousValue || !currentValue || !operator) return;

  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  let result = 0;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = current !== 0 ? prev / current : "Error";
      break;
    default:
      return;
  }

  currentValue = result.toString();
  previousValue = "";
  operator = "";
  isResultDisplayed = true;
}

function clearAll() {
  currentValue = "";
  previousValue = "";
  operator = "";
  isResultDisplayed = false;
}

function toggleSign() {
  if (currentValue) {
    currentValue = (-parseFloat(currentValue)).toString();
  }
}

function applyPercentage() {
  if (currentValue) {
    currentValue = (parseFloat(currentValue) / 100).toString();
  }
}

function updateOutput() {
  output.textContent = currentValue || previousValue || "0";
}
