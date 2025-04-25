if (typeof math === "undefined") {
  console.error("mathjs not loading");
}

const display = document.getElementById("display");
let expression = "0";
let lastResult = null;
let justEvaluated = false;
let lastBracketWasOpen = false;

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;

    if (expression === "0" && ["+", "x", "-", "÷"].includes(buttonText)) {
      alert("Invalid Format");
      return;
    }

    if (buttonText === "=") {
      expression = expression.replace(/x/g, "*").replace(/÷/g, "/");
      try {
        const result = math.evaluate(expression);
        display.textContent = Number(result).toLocaleString();
        lastResult = result.toString();
        justEvaluated = true;
        // expression = "0";
      } catch (error) {
        display.textContent = "Error";
        expression = "0";
      }
      return;
    }

    if (buttonText === "C") {
      expression = "0";
      display.textContent = formatExpression(expression);
      lastResult = null;
      justEvaluated = false;
      return;
    }

    if (buttonText === "( )") {
      if (lastBracketWasOpen) {
        expression += ")";
        lastBracketWasOpen = false;
      } else {
        expression += "(";
        lastBracketWasOpen = true;
      }
      justEvaluated = false;
      display.textContent = formatExpression(expression);
      return;
    }

    if (buttonText === "%") {
      const value = math.evaluate(expression);
      const percent = value * 0.01;
      expression = percent.toString();
      display.textContent = formatExpression(expression);
      justEvaluated = true;
      return;
    }

    if (buttonText === "+/-") {
      if (expression[0] === "-") {
        expression = expression.substring(1);
      } else {
        expression = "-" + expression;
      }
      display.textContent = formatExpression(expression);
      return;
    }

    if (expression === "-0") {
      if (buttonText === ".") {
        expression = "-0" + buttonText;
      } else if (!["+", "x", "-", "÷"].includes(buttonText)) {
        expression = "-" + buttonText;
      }
      display.textContent = formatExpression(expression);
      justEvaluated = false;
      return;
    }

    if (["+", "x", "-", "÷"].includes(buttonText)) {
      if (justEvaluated && lastResult !== null) {
        expression = lastResult + buttonText;
        justEvaluated = false;
        display.textContent = formatExpression(expression);
        return;
      }
    }

    if (expression === "0") {
      if (buttonText === ".") {
        expression = "0" + buttonText;
      } else {
        expression = buttonText;
      }
      display.textContent = formatExpression(expression);
      justEvaluated = false;
      return;
    }

    expression += buttonText;
    display.textContent = formatExpression(expression);
    justEvaluated = false;
  });
});

function formatExpression(expr) {
  return expr
    .replace(/(\d+)(?=(\d{3})+(?!\d))/g, "$1,")
    .replace(/,/g, (match, offset, string) => {
      const before = string[offset - 1];
      const after = string[offset + 1];
      // Keep comma only if not between digits (e.g., in real 1,000)
      if (/\d/.test(before) && /\d/.test(after)) return ",";
      return "";
    });
}