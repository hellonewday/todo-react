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
      <div className="mt-6">
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          placeholder="Your new task..."
          type="text"
          value={input}
          name="input"
          onChange={onChange}
        />
        <button
          onClick={onSave}
          className="py-1 mt-2 px-4 bg-blue-500 rounded-md text-white hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
      {isInvalid && <span className="text-sm px-1 py-1 text-red-500 font-bold">Invalid input</span>}
    </div>
  );
}

export default NameInput;
