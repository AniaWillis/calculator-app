// function validateInput contains logic that prevents a sequence of characters that would cause an error
export function validateInput({
  input,
  lastInput,
  lastDisplay,
  displayValue,
  numbers,
  operators,
  noStartValues,
  signs,
  handleClear,
}) {
  const openCount = (displayValue.match(/\(/g) || []).length;
  const closeCount = (displayValue.match(/\)/g) || []).length;
  const lastNumber = displayValue.split(/[+\-*/%()]/).pop();

  if (lastInput === "=" && input === ".") {
    handleClear();
    return "0.";
  }
  if (input === "." && (lastDisplay === "." || lastNumber.includes(".")))
    return "";
  if (input === "." && (!numbers.includes(lastInput) || displayValue === ""))
    return "0.";
  if (signs.includes(input) && lastDisplay === ".") return "";
  if (
    operators.includes(input) &&
    (operators.includes(lastDisplay) ||
      lastDisplay === "(" ||
      lastDisplay === ".")
  )
    return "";
  if (operators.includes(input) && signs.includes(lastDisplay)) return "";
  if (displayValue === "" && noStartValues.includes(input)) return "";
  if (
    input === ")" &&
    (operators.includes(lastDisplay) ||
      signs.includes(lastDisplay) ||
      lastDisplay === "(" ||
      lastDisplay === "." ||
      closeCount >= openCount)
  )
    return "";
  if (input === "(" && lastDisplay === ".") return "";
  if (displayValue === "0" && input === "0") return "";
  return input;
}
