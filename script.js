class Calculator {
  constructor(previousTypedTextElement, currentTypedTextElement) {
    this.previousTypedTextElement = previousTypedTextElement;
    this.currentTypedTextElement = currentTypedTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {}

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    this.operation = operation;
    this.previousOperand = tis.currentOperand;
    this.currentOperand = "";
  }

  compute() {}

  updateDisplay() {
    this.currentTypedTextElement.innerText = this.currentOperand;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousTypedTextElement = document.querySelector(
  "[data-previous-typed]"
);
const currentTypedTextElement = document.querySelector("[data-current-typed]");

// define the class
const calculator = new Calculator(
  previousTypedTextElement,
  currentTypedTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
