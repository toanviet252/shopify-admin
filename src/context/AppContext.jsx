import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../utils/localStorage";

const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setAuth] = useState(false);
  const [userData, setUserData] = useState(null);
  const loggedIn = (data) => {
    setAuth(true);
    setUserData(data);
  };
  const loggedOut = () => {
    setAuth(false);
    setUserData(null);
    clearToken();
    navigate("/signin");
  };
  const value = { isAuth, userData, loggedIn, loggedOut };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export { AppContextProvider, AppContext };
