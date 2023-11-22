import { useState } from "react";

function NameInput(prop) {
  const { saveHandler } = prop;
  const [isInvalid, setIsInvalid] = useState(false);
  const [input, setInput] = useState("");

  const onChange = (event) => {
    setInput(event.target.value);
  };

  const onSave = (event) => {
    event.preventDefault();
    if (input.length < 3) {
      setIsInvalid(true);
    } else {
      setInput("");
      setIsInvalid(false);
      saveHandler(input);
    }
  };

  return (
    <div>
      <label>Input:</label>
      <input type="text" value={input} name="input" onChange={onChange} />
      <button onClick={onSave}>Create</button>
      {isInvalid && <span style={{ color: "red" }}>Invalid input</span>}
    </div>
  );
}

export default NameInput;
