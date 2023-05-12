import { useState } from "react";
import DashboardDetail from "../../dashboard/Components/DashboardDetail";
import Pagination from "../../../components/Pagination/Pagination";

function OrderItems({ itemsPerPage, items }) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const handleOpenModal = (id) => {
    setOrderId(id);
    setOpen(true);
  };

  return (
    <>
      <DashboardDetail open={open} setOpen={setOpen} orderId={orderId} />
      <table>
        <thead>
          <tr>
            <th>Order's ID</th>
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
          {currentItems.length > 0 &&
            currentItems.map((order) => (
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
                  <button onClick={() => handleOpenModal(order._id)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
    </>
  );
}
export default OrderItems;
