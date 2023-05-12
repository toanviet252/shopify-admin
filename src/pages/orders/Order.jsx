import { useEffect, useState } from "react";
import "./order.css";
import { handlerError } from "../../utils/notification";
import { getAllOrders } from "../../api/admin";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import Spin from "../../components/Suspense/BoostrapSpinner/Spin";
import OrderList from "./components/orderList";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);

  const [loading, setLoading] = useState(false);
  const fetchOrderData = async () => {
    setLoading(true);
    try {
      const res = await getAllOrders();
      setOrderData(res.data);
    } catch (err) {
      handlerError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <>
      <Header />

      <div className="order-container">
        <Sidebar />
        <div className="orders">
          <h3>Orders Page</h3>
          {loading ? (
            <Spin color={"primary"} size={"lg"} />
          ) : (
            <>
              <OrderList itemsPerPage={5} items={orderData} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Orders;
