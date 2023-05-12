import "./NewProduct.css";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Category } from "../../constants/category";
import { handlerError, notification } from "../../utils/notification";
import { addNewProduct, updateProduct } from "../../api/admin";
import Spinner from "../../components/Suspense/Loading";
import { formatMoney, revertMoney } from "../../utils/convertMoneyLocale";

const NewProduct = ({ edit }) => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const { state } = useLocation();
  const editData = useMemo(() => state, [state]);

  const [prodName, setProdName] = useState(editData?.name ?? "");
  const [category, setCategory] = useState(editData?.category ?? "");
  const [shortDesc, setShortDesc] = useState(editData?.short_desc ?? "");
  const [longDesc, setLongDesc] = useState(editData?.long_desc ?? "");
  const [price, setPrice] = useState(formatMoney(editData?.price ?? 0));
  const [count, setCount] = useState(editData?.count ?? 0);

  const [previewImgs, setPreviewImgs] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const revertPrice = useMemo(() => {
    return revertMoney(price);
  }, [price]);

  const categoryOptions = useMemo(() => {
    const rs = [];
    for (const [key, value] of Object.entries(Category)) {
      rs.push({
        label: value,
        value: key,
      });
    }
    return rs;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setConfirmLoading(true);
    try {
      if (!edit) {
        const res = await addNewProduct(data);
        notification("success", res?.message);
        navigate("/products");
        e.target.reset(); //reset form
      } else {
        if (!productId) return;
        const res = await updateProduct(productId, data);
        notification("success", res?.message);
        navigate("/products");
      }
    } catch (err) {
      handlerError(err);
    } finally {
      setConfirmLoading(false);
    }
  };
  useEffect(() => {
    if (state === null) {
      setProdName("");
      setCategory("");
      setShortDesc("");
      setLongDesc("");
      setPrice(0);
      setCount(0);
    }
  }, [state]);
  const [validateType, setValidateType] = useState(null);
  const handleImageChange = (e) => {
    const files = e.target.files;
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      if (!files[i].name.match(/\.(jpg|jpeg|png|gif)$/)) {
        setValidateType("Only accept image files");
        break;
      } else {
        urls.push(URL.createObjectURL(files[i]));
      }
    }
    if (validateType === null) {
      setPreviewImgs(urls);
    }
  };

  return (
    <div>
      <Header />
      <div className="addProduct-container">
        <Sidebar />

        <div className="container">
          <h2>{edit ? "Edit Product" : "Add Product"}</h2>
          <form className="form-container" onSubmit={handleSubmit} id="form">
            <div className="form-group col">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Product Name"
                onChange={(e) => setProdName(e.target.value)}
                className="form-control"
                value={prodName}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="category">Category</label>
              <select
                className="form-control"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                defaultValue={""}
              >
                <option value="">Choose category</option>
                {categoryOptions.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group col">
              <label htmlFor="price">Price (VNĐ)</label>
              <input
                name="price"
                onChange={(e) => setPrice(formatMoney(e.target.value))}
                placeholder="Enter price"
                className="form-control"
                value={price}
                type="text"
              />

              <p style={{ margin: 0 }}>{revertPrice}</p>
            </div>
            <div className="form-group col">
              <label htmlFor="count">Avalible products</label>
              <input
                type="number"
                min={0}
                name="count"
                placeholder="Quantity of products in store"
                className="form-control"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="short_desc">Short Description</label>
              <textarea
                type="text"
                name="short_desc"
                placeholder="Enter Short Description"
                rows={5}
                onChange={(e) => setShortDesc(e.target.value)}
                className="form-control"
                value={shortDesc}
              ></textarea>
            </div>
            <div className="form-group col">
              <label htmlFor="long_desc">Long Description</label>
              <textarea
                type="text"
                name="long_desc"
                placeholder="Enter Long Description"
                rows={10}
                onChange={(e) => setLongDesc(e.target.value)}
                className="form-control"
                value={longDesc}
              ></textarea>
            </div>
            {!edit && (
              <div className="form-group col">
                <label htmlFor="photos">Upload Images</label>
                <input
                  type="file"
                  multiple
                  name="photos"
                  onChange={(e) => handleImageChange(e)}
                  className="form-control"
                  onClick={() => setValidateType(null)}
                />
              </div>
            )}
            {validateType && <p>{validateType}</p>}
            {previewImgs.length > 0 && (
              <div
                className="form-group col"
                style={{ display: "flex", alignItems: "stretch", gap: "1rem" }}
              >
                {previewImgs.map((item, index) => {
                  return (
                    <img
                      src={item}
                      alt="preview"
                      width="150"
                      key={index}
                      style={{ objectFit: "cover" }}
                    />
                  );
                })}
              </div>
            )}
            <div className="form-group col">
              <button type="submit" className="btn btn-primary">
                {confirmLoading && <Spinner type="sm" />}
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
