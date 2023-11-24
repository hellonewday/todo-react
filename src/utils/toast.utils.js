import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const fireToast = (type, message, theme) => {
  toast(message, {
    type,
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      fontSize: 14,
    },
    theme,
  });
};
