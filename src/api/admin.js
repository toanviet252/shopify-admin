import axiosClient from "./axios";
import { ADMIN_PATH } from "../constants/path";

export const getDashboarData = async () => {
  return await axiosClient.get(ADMIN_PATH.DASHBOARD);
};
export const getOrderDetail = async (id) => {
  return await axiosClient.get(`${ADMIN_PATH.ORDER}/${id}`);
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
