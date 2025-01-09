document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn");
  let currentInput = ""; // Current input
  let previousInput = ""; // Previous input
  let operator = ""; // Current operator

  // Button click handler
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-value");

      if (value === null) { // Check for null explicitly
        if (button.id === "clear") {
          clearDisplay();
        } else if (button.id === "equal") {
          calculate();
        }
      } else {
        handleInput(value);
      }
    });
  });

  // Handle input
  function handleInput(value) {
    if (["+", "-", "*", "/"].includes(value)) {
      if (currentInput === "" && previousInput === "") return; // Prevent setting an operator without input
      if (operator && currentInput) calculate(); // Chain calculations when an operator is pressed again
      operator = value;
      previousInput = currentInput || previousInput || "0"; // Handle empty inputs
      currentInput = "";
    } else {
      currentInput += value;
    }
    updateDisplay();
  }

  // Update display
  function updateDisplay() {
    display.textContent = currentInput || previousInput || "0";
  }

  // Clear display
  function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay();
  }

  // Perform calculation
  function calculate() {
    if (currentInput && previousInput && operator) {
      try {
        const result = eval(`${previousInput} ${operator} ${currentInput}`);
        currentInput = parseFloat(result.toFixed(10)).toString(); // Avoid floating-point precision errors
        previousInput = "";
        operator = "";
        updateDisplay();
      } catch (error) {
        clearDisplay();
        display.textContent = "Error"; // Display an error message
      }
    }
  }
});
