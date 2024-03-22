import "./Products.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { handlerError, notification } from "../../utils/notification";
import { deleteProduct, getAllProducts } from "../../api/admin";
import Spin from "../../components/Suspense/BoostrapSpinner/Spin";
import { formatMoney } from "../../utils/convertMoneyLocale";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { Modal, ModalFooter, ModalBody } from "reactstrap";
import fallbackImg from "../../assets/default-fallback-image.png";
import { BASE_URL } from "../../constants/path";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(undefined);
  // const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const toggle = () => setOpen(!open);
  const fetchAllProducts = async (params) => {
    setLoading(true);
    try {
      const res = await getAllProducts(params);
      setProducts(res.data);
    } catch (err) {
      handlerError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleSearch = (e) => {
    fetchAllProducts({ name: e.target.value });
  };

  const handleDelete = (id) => {
    setProductId(id);
    setOpen(true);
  };
  const onDeleteProduct = async () => {
    try {
      const res = await deleteProduct(productId);
      fetchAllProducts();
      notification("success", res?.message);
      setOpen(false);
    } catch (err) {
      handlerError(err);
    }
  };

  const handleEditHotel = (id, data) => {
    const prodId = id;
    navigate(`/edit-product/${prodId}`, { state: data });
  };

  return (
    <>
      <Header />

      <Modal isOpen={open} toggle={toggle}>
        <ModalBody>
          <p>Are you sure to delete?</p>
          <ModalFooter>
            <button className="confirm-btn confirm" onClick={onDeleteProduct}>
              Yes
            </button>
            <button className="confirm-btn" onClick={toggle}>
              No
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
      <div className="products-container">
        <Sidebar />
        <div className="products-container__main">
          <div className="search">
            <h1>Products</h1>
            <input
              type="text"
              placeholder="Search product"
              onChange={(e) => handleSearch(e)}
              className="form-control m-0"
            />
          </div>
          {loading ? (
            <Spin color={"primary"} size={"lg"} />
          ) : (
            <div className="products-container__main-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 &&
                    products.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{formatMoney(product.price)}</td>
                        <td>
                          <img
                            src={product.photos[0]}
                            width="100"
                            onError={(e) => {
                              if (
                                e.target.src !==
                                `${BASE_URL}/${product.photos[0]}`
                              ) {
                                e.target.src = fallbackImg;
                              }
                            }}
                          />
                        </td>
                        <td>{product.category}</td>
                        <td>
                          <div className="action-container">
                            <button
                              className="action-btn"
                              onClick={() =>
                                handleEditHotel(product._id, product)
                              }
                            >
                              <AiOutlineEdit />
                            </button>
                            <button
                              className="action-btn"
                              onClick={() => {
                                handleDelete(product._id);
                              }}
                            >
                              <BsTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
