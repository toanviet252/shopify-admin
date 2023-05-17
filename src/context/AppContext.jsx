import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../utils/localStorage";
import { signOut } from "../api/auth";
import { handlerError } from "../utils/notification";

const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setAuth] = useState(false);
  const [userData, setUserData] = useState(null);
  const loggedIn = (data) => {
    setAuth(true);
    setUserData(data);
  };
  const loggedOut = async () => {
    try {
      await signOut();
      setAuth(false);
      setUserData(null);
      clearToken();

      navigate("/signin");
    } catch (err) {
      handlerError(err);
    }
  };
  const value = { isAuth, userData, loggedIn, loggedOut };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export { AppContextProvider, AppContext };
