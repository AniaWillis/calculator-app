function Keyboard({ onAddValue, onClear, onEqual }) {
  const buttonLeftStyle = {
    backgroundColor: "white",
    color: "black",
    padding: "10px",
    borderRadius: "4px",
    textAlign: "center",
    width: "100%",
    border: "4px solid black",
    cursor: "pointer",
  };
  const buttonRightStyle = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    borderRadius: "4px",
    textAlign: "center",
    width: "100%",
    border: "4px solid black",
    cursor: "pointer",
  };

  const buttonsLeft = [
    ["(", ")", "%"],
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    ["C", 0, "."],
  ];

  const buttonsRight = ["/", "x", "-", "+", "="];

  // function addClass adds scale class and removes it after .2 second to make the button appear pressed
  function addClass(element) {
    if (!element) return;

    element.classList.add("scale-97");

    setTimeout(() => {
      element.classList.remove("scale-97");
    }, 200);
  }

  return (
    <div className="flex sm:w-lg w-sm gap-3 text-5xl font-bold font-mono">
      <div className="flex flex-col w-3/4 text-white  gap-3">
        {buttonsLeft.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-around gap-3">
            {row.map((btn) => (
              <input
                key={btn}
                type="button"
                style={buttonLeftStyle}
                value={btn}
                onClick={(e) => {
                  if (btn === "C") {
                    onClear();
                  } else {
                    onAddValue(e.target.value);
                  }
                  addClass(e.target);
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="w-1/4 text-white flex flex-col items-center gap-3">
        {buttonsRight.map((btn) => (
          <input
            key={btn}
            type="button"
            style={buttonRightStyle}
            value={btn}
            onClick={(e) => {
              if (btn === "=") {
                onEqual();
              } else if (btn === "x") {
                onAddValue("*");
              } else {
                onAddValue(e.target.value);
              }
              addClass(e.target);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Keyboard;
