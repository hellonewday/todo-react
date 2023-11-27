function NameInput(prop) {
  const { saveHandler, buttonName, onChange, value } = prop;

  return (
    <div className="space-x-2">
      <input
        className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Write something..."
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
  );
}

export default NameInput;
