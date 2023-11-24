function NameInput(prop) {
  const { saveHandler, buttonName, invalid, onChange, value} = prop;

  return (
    <>
      <div className="mt-6 mb-2">
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Your new task..."
          type="text"
          onChange={onChange}
          value={value}
        />
        <button
          onClick={saveHandler}
          className="py-1 mt-2 px-4 bg-blue-500 rounded-md text-white hover:bg-blue-600"
        >
          {buttonName}
        </button>

      </div>
      {invalid && (
        <span className="text-sm px-1 py-1 text-red-500 font-bold">
          Invalid input
        </span>
      )}
    </>
  );
}

export default NameInput;
