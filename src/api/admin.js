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
  console.log(body);
  const newData = new FormData();
  Object.keys(body).forEach((key) => {
    if (key === "photos") {
      for (let i = 0; i < body.photos.length; i++) {
        console.log(key, body[key][i]);
        newData.append(key, body[key][i]);
      }
    } else {
      newData.append(key, body[key]);
    }
  });
  return await axiosClient.post(ADMIN_PATH.PRODUCT, newData);
};
export const updateProduct = async (id, data) => {
  return await axiosClient.patch(`${ADMIN_PATH.PRODUCT}/${id}`, data);
};
export const deleteProduct = async (id) => {
  return await axiosClient.delete(`${ADMIN_PATH.PRODUCT}/${id}`);
};
