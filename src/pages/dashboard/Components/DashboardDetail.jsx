import { useEffect, useState } from "react";
import { handlerError } from "../../../utils/notification";
import { getOrderDetail } from "../../../api/admin";
import { Modal, ModalHeader, ModalBody, Table } from "reactstrap";
import { FaTimes } from "react-icons/fa";
import { formatMoney } from "../../../utils/convertMoneyLocale";
import Spin from "../../../components/Suspense/BoostrapSpinner/Spin";

export const Products = ({ productData }) => {
  return (
    <Table className="w-auto">
      <thead>
        <tr>
          <th>Name</th>
          <th>Photo</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {productData.length > 0 &&
          productData.map((prd) => (
            <tr key={prd.product._id}>
              <th>{prd.product.name}</th>
              <th>
                <img
                  src={prd.product.photos[0]}
                  alt="product img"
                  width={"100"}
                />
              </th>
              <th>{formatMoney(prd.product.price)}</th>
              <th>{prd.quantity}</th>
              <th>{formatMoney(prd.product.price * prd.quantity)}</th>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

const DashboardDetail = ({ orderId, open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const toggle = () => setOpen(!open);
  const fetchOrderDetail = async () => {
    setLoading(true);
    if (!orderId) return;
    setLoading(true);
    try {
      const res = await getOrderDetail(orderId);
      setData(res.data);
    } catch (err) {
      handlerError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);
  return (
    <Modal
      isOpen={open}
      toggle={toggle}
      size="lg"
      scrollable
      className="modal-container"
    >
      <ModalHeader
        close={<FaTimes onClick={toggle} style={{ cursor: "pointer" }} />}
      >
        Order Detail
      </ModalHeader>
      {loading ? (
        <Spin color="primary" size="lg" />
      ) : (
        <>
          {data && (
            <ModalBody>
              <div className="orderInfor-container">
                <p>
                  <span className="title-infor">Orderer:</span>
                  {data.orderInfor.fullname}
                </p>
                <p>
                  <span className="title-infor">Address:</span>
                  {data.orderInfor.address}
                </p>
                <p>
                  <span className="title-infor">Email:</span>
                  {data.orderInfor.email}
                </p>
                <p>
                  <span className="title-infor">Phone:</span>
                  {data.orderInfor.phoneNumber}
                </p>
                <p>
                  <span className="title-infor">Status:</span>
                  <span
                    style={{
                      backgroundColor:
                        data.status === "Orderd" ? "green" : "red",
                      color: "white",
                      padding: "5px",
                      borderRadius: "2px",
                    }}
                  >
                    {data.status}
                  </span>
                </p>
              </div>
              <div className="product-container">
                <Products productData={data.products} />
              </div>
              <hr />
              <h4>Total: {formatMoney(data.totalPrice)} VNĐ</h4>
            </ModalBody>
          )}
        </>
      )}
    </Modal>
  );
};
export default DashboardDetail;
