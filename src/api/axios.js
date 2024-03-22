// api/axiosClient.js
import axios from "axios";
import { clearToken, getToken } from "../utils/localStorage";
import { BASE_URL } from "../constants/path";

// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
  baseURL: BASE_URL,
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  const token = getToken("token");
  if (token) {
    config.headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.data.message);
      }
      return response.data;
    }
    return response;
  },
  (error) => {
    const config = error?.response?.config;
    if (error?.response?.status === 401) {
      clearToken();
      if (config.url === "/me")
        return Promise.reject("Token expired, need to login again!");
      window.location.replace("/signin");
    }
    // Handle errors
    throw error;
  }
);
export default axiosClient;
