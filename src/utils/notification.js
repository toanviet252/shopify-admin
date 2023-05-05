import { toast } from "react-toastify";

export const notification = (status, message) => {
  return toast[status](message);
};

export const handlerError = (err) => {
  return toast.error(err?.response?.data?.message || err.message || err);
};
