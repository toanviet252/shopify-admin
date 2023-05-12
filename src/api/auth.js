import axiosClient from "./axios";
import { ADMIN_PATH } from "../constants/path";

export const signUp = async (data) => {
  return await axiosClient.post(ADMIN_PATH.AUTH.SIGN_UP, data);
};
export const signin = async (data) => {
  return await axiosClient.post(ADMIN_PATH.AUTH.SIGN_IN, data);
};

export const getMe = async () => {
  return await axiosClient.get(ADMIN_PATH.AUTH.ME);
};

export const signOut = async () => {
  return await axiosClient.post(ADMIN_PATH.AUTH.SIGN_OUT);
};
