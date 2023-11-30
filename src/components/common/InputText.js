const InputText = (prop) => {
  const { labelName, isFormInvalid, ...formProps } = prop;
  return (
    <>
      <label
        className={`block mb-2 text-sm font-medium  ${
          isFormInvalid !== undefined ? "text-red-700" : "text-gray-900"
        }`}
      >
        {/* */}
        {labelName}
      </label>
      <input
        type="text"
        className={`w-80 md:w-96 text-sm
                      ${
                        isFormInvalid !== undefined
                          ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700"
                          : "bg-gray-50 border border-gray-300 text-gray-900 "
                      }
                      rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5`}
        {...formProps}
        required=""
      />
      {isFormInvalid !== undefined && (
        <p className="error-message text-sm py-1 text-red-600">
          {isFormInvalid}
        </p>
      )}
    </>
  );
};

export default InputText;
