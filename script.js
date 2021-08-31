class Calculator {
  constructor(previousTypedTextElement, currentTypedTextElement) {
    this.previousTypedTextElement = previousTypedTextElement;
    this.currentTypedTextElement = currentTypedTextElement;
    this.clear();
  }

  //define all the functions

  clear() {
    this.currentTyped = "";
    this.previousTyped = "";
    this.operation = undefined;
  }

  delete() {
    this.currentTyped = this.currentTyped.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentTyped.includes(".")) return;
    this.currentTyped = this.currentTyped.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentTyped === "") return;
    if (this.previousTyped !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousTyped = this.currentTyped;
    this.currentTyped = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousTyped);
    const current = parseFloat(this.currentTyped);
    //if not a number in the previous or not a number in the current
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentTyped = computation;
    this.operation = undefined;
    this.previousTyped = "";
  }
//work on this area
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDigits = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentTypedTextElement.innerText = this.currentTyped;
    if (this.operation != null) {
      this.previousTypedTextElement.innerText =
        //using back ticks, concat the operations
        `${this.getDisplayNumber(this.previousTyped)} ${this.operation}`;
    } else {
      this.previousTypedTextElement.innerText = "";
    }
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

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
