import React, { useState, useRef, useEffect } from "react";
import { evaluate } from "mathjs";

import { BACKGROUND_COLORS } from "./constants/backgroundColors";
import {
  numbers,
  operators,
  noStartValues,
  signs,
} from "./constants/calculatorTokens";
import { validateInput } from "./utils/validateInput";
import ColorBar from "./components/ColorBar";
import Display from "./components/Display";
import Keyboard from "./components/Keyboard";

function App() {
  const [backgroundColor, setBackgroundColor] = useState(
    BACKGROUND_COLORS["lime"]
  );
  const [displayValue, setDisplayValue] = useState("");
  const lastDisplayValue = useRef("");
  const lastInputValue = useRef("");

  useEffect(() => {
    lastDisplayValue.current = displayValue.slice(-1);
  }, [displayValue]);

  function handleDisplay(inputValue) {
    if (lastInputValue.current === "=" && numbers.includes(inputValue))
      handleClear();

    const validatedInput = validateInput({
      input: inputValue,
      lastInput: lastInputValue.current,
      lastDisplay: lastDisplayValue.current,
      displayValue,
      numbers,
      operators,
      noStartValues,
      signs,
      handleClear,
    });

    try {
      setDisplayValue((prevDisplayValue) => {
        if (prevDisplayValue === "0" && numbers.includes(inputValue))
          return inputValue;
        return prevDisplayValue === "ERROR"
          ? inputValue
          : prevDisplayValue + validatedInput;
      });
    } catch (err) {
      setDisplayValue("ERROR" + err.message);
    } finally {
      lastInputValue.current = inputValue;
    }
  }

  function handleClear() {
    setDisplayValue("");
    lastInputValue.current = "";
  }

  function handleCalculate() {
    try {
      if (displayValue === "") {
        lastInputValue.current = "=";
        return "";
      }

      const result = evaluate(displayValue);
      if (!isFinite(result)) {
        throw new Error("Invalid calculation");
      }
      setDisplayValue(result.toString());
    } catch (err) {
      setDisplayValue("ERROR" + err.message);
    } finally {
      lastInputValue.current = "=";
    }
  }

  function handleBackgroundColor(color) {
    setBackgroundColor(BACKGROUND_COLORS[color]);
  }

  return (
    <>
      <div
        className={`flex flex-col m-auto w-fit  sm:h-fit items-center gap-3 pt-6 ${backgroundColor}  border-4 p-5 rounded`}
      >
        <Display display={displayValue} />
        <Keyboard
          onAddValue={handleDisplay}
          onClear={handleClear}
          onEqual={handleCalculate}
        />
        <ColorBar onColor={handleBackgroundColor} />
      </div>
    </>
  );
}

export default App;
