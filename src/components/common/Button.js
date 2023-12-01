const Button = (prop) => {
  const generateTheme = (theme) => {
    switch (theme) {
      case "primary":
        return "bg-blue-600 text-white";
      case "default":
        return "bg-gray-200";
      case "attention":
        return "bg-red-600 text-white";
      case "submit":
        return "bg-emerald-500 text-white";
      default:
        return "";
    }
  };
  const { handleClick, children, theme, styles } = prop;
  return (
    <button
      onClick={handleClick}
      className={`${generateTheme(
        theme
      )} ${styles} rounded-md px-4 py-2 flex space-x-2 items-center`}
    >
      {children}
    </button>
  );
};
export default Button;
