import axiosClient from "./axios";
import { ADMIN_PATH } from "../constants/path";

export const getDashboarData = async () => {
  return await axiosClient.get(ADMIN_PATH.DASHBOARD);
};
export const getOrderDetail = async (id) => {
  return await axiosClient.get(`${ADMIN_PATH.ORDER}/${id}`);
};
export const getAllOrders = async () => {
  return await axiosClient.get(ADMIN_PATH.ORDER);
};

export const getAllProducts = async (params) => {
  return await axiosClient.get(ADMIN_PATH.PRODUCT, { params });
};
export const getProduct = async (id) => {
  return await axiosClient.get(`${ADMIN_PATH.PRODUCT}/${id}`);
};
export const addNewProduct = async (body) => {
  return await axiosClient.post(ADMIN_PATH.PRODUCT, body);
};
export const updateProduct = async (id, data) => {
  return await axiosClient.patch(`${ADMIN_PATH.PRODUCT}/${id}`, data);
};
export const deleteProduct = async (id) => {
  return await axiosClient.delete(`${ADMIN_PATH.PRODUCT}/${id}`);
};

// chat
export const getAllChatRooms = async () => {
  return await axiosClient.get(ADMIN_PATH.CHAT);
};
export const getChatroom = async (roomId) => {
  return await axiosClient.get(`${ADMIN_PATH.CHAT}/${roomId}`);
};
export const postMessage = async (data) => {
  return await axiosClient.post("/chatrooms/addMessage", data);
};
