import "./DashBoard.css";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { FaUser, FaMoneyBill, FaListAlt } from "react-icons/fa";
import { handlerError } from "../../utils/notification";
import { getDashboarData } from "../../api/admin";
import DashboardDetail from "./Components/DashboardDetail";
import Spin from "../../components/Suspense/BoostrapSpinner/Spin";
import { formatMoney } from "../../utils/convertMoneyLocale";

const DashBoard = () => {
  const [loading, setLoading] = useState(false);
  const [dashboarData, setDashboardData] = useState(null);
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getDashboarData();
      setDashboardData(res.data);
    } catch (err) {
      handlerError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleOpenModal = (id) => {
    setOrderId(id);
    setOpen(true);
  };
  return (
    <div>
      <Header />
      <DashboardDetail open={open} setOpen={setOpen} orderId={orderId} />
      <div className="dashboard-container">
        <Sidebar />
        {loading ? (
          <Spin color={"primary"} size={"lg"} />
        ) : (
          <div className="dashboard-main">
            <h1>DashBoard</h1>
            <div className="dashboard-info">
              <div className="dashboard-items">
                <div className="dashboard-items-item" id="users">
                  <h4>Clients</h4>
                  <p className="item--data">{dashboarData?.users.length}</p>
                  <span>
                    <FaUser style={{ color: "#000", fontSize: "20px" }} />
                  </span>
                </div>
                <div className="dashboard-items-item" id="users">
                  <h4>Earnings</h4>
                  <p className="item--data">
                    {dashboarData?.totalEarning
                      ? formatMoney(dashboarData?.totalEarning)
                      : 0}
                  </p>
                  <span>
                    <FaMoneyBill style={{ color: "#000", fontSize: "20px" }} />
                  </span>
                </div>
                <div className="dashboard-items-item" id="users">
                  <h4>Orders</h4>
                  <p className="item--data">{dashboarData?.orders?.length}</p>
                  <span>
                    <FaListAlt style={{ color: "#000", fontSize: "20px" }} />
                  </span>
                </div>
              </div>
              <div className="dashboard-history">
                <h4>Lastest Order</h4>
                <div className="history-table">
                  <table>
                    <thead>
                      <tr>
                        <th>ID User</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Total</th>
                        <th>Delivery</th>
                        <th>Status</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboarData?.orders?.length > 0 &&
                        dashboarData?.orders?.slice(0, 8).map((order) => (
                          <tr key={order._id}>
                            <td>{order.userOrder}</td>
                            <td>{order.orderInfor.fullname}</td>
                            <td>{order.orderInfor.phoneNumber}</td>
                            <td>{order.orderInfor.address}</td>
                            <td>
                              {new Intl.NumberFormat("vn-Vn", {
                                style: "currency",
                                currency: "VND",
                              }).format(order.totalPrice)}
                            </td>
                            <td>
                              {order.orderDelivery === "processing"
                                ? "Chưa vận chuyển"
                                : "Đang vận chuyển"}
                            </td>
                            <td>
                              {order.orderStatus === "Waiting for pay"
                                ? "Chưa thanh toán"
                                : "Đã thanh toán"}
                            </td>
                            <td>
                              <button
                                onClick={() => handleOpenModal(order._id)}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
