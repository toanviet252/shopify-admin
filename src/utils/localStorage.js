export const getToken = () => localStorage.getItem("token");
export const saveDataToLocalStorage = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("id_user", data.user._id);
  localStorage.setItem("name_user", data.user.fullName);
  localStorage.setItem("role", data.user.role);
};
export const clearToken = () => localStorage.clear();
