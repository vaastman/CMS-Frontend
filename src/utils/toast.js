import { toast } from "react-toastify";

const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
};

export const showToast = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message, toastConfig);
      break;
    case "error":
      toast.error(message, toastConfig);
      break;
    case "info":
      toast.info(message, toastConfig);
      break;
    case "warning":
      toast.warning(message, toastConfig);
      break;
    default:
      toast(message, toastConfig);
  }
};
