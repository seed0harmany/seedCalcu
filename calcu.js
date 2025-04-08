if (typeof math === "undefined") {
  console.error("math.js not loading");
}

const inputField = document.getElementById("input");
let lastBracketWasOpen = false;

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;
    let currentInput = inputField.textContent;

    if (
      currentInput === "0" &&
      ["( )", "+", "=", "x", "÷", "%", "-"].includes(buttonText)
    ) {
      alert("Invalid Format");
    } else if (buttonText === "=") {
      let expression = inputField.textContent;
      expression = expression.replace(/x/g, "*").replace(/÷/, "/");
      try {
        const result = math.evaluate(expression);
        inputField.textContent = result;
      } catch (error) {
        return "Error";
      }
    } else if (buttonText === "C") {
      inputField.textContent = "0";
    } else if (buttonText === "( )") {
      if (lastBracketWasOpen) {
        inputField.textContent += ")";
        lastBracketWasOpen = false;
      } else {
        inputField.textContent += "(";
        lastBracketWasOpen = true;
      }
    } else if (buttonText === "%") {
      inputField.textContent = (inputField.textContent * 1) / 100;
    } else if (buttonText === "+/-") {
      if (currentInput === "0") {
        inputField.textContent = "-0";
      } else if (currentInput[0] === "-") {
        inputField.textContent = currentInput.substring(1);
      } else {
        inputField.textContent = "-" + currentInput;
      }
    } else if (currentInput === "-0") {
      inputField.textContent = "-" + buttonText;
    } else if (currentInput === "0") {
      inputField.textContent = buttonText;
    } else {
      inputField.textContent += buttonText;
    }
  });
});

function evaluateExpression(expression) {}
