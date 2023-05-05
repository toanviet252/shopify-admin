import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Signin from "./pages/signin/Signin";
import Products from "./pages/product/Products";
import Chat from "./pages/chatroom/Chat";
import DashBoard from "./pages/dashboard/DashBoard";
import NewProduct from "./pages/newProduct/NewProduct";
import EditProduct from "./pages/editProduct/EditProduct";
import Notification from "./components/Notification";
import { useContext, useEffect } from "react";
import { handlerError } from "./utils/notification";
import { getMe } from "./api/auth";
import { AppContext } from "./context/AppContext";
import "./App.css";

function App() {
  const { loggedIn } = useContext(AppContext);
  const authorize = async () => {
    try {
      const res = await getMe();
      loggedIn(res.data);
    } catch (err) {
      handlerError(err);
    }
  };
  useEffect(() => {
    authorize();
  }, []);
  return (
    <>
      <Notification />

      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/products" element={<Products />} />
        <Route path="/chatrooms" element={<Chat />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/edit-product/:ProdId" element={<EditProduct />} />
      </Routes>
    </>
  );
}

export default App;
