import "./NewProduct.css";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Category } from "../../constants/category";
import { handlerError } from "../../utils/notification";
import { addNewProduct } from "../../api/admin";
const NewProduct = () => {
  const navigate = useNavigate();
  const [prodName, setProdName] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
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
    const data = {};
    const formData = new FormData(e.target);
    let fileArr = [];
    for (const [key, value] of formData.entries()) {
      if (key === "photos") {
        fileArr.push(value);
        data[key] = fileArr;
      } else {
        data[key] = value;
      }
    }
    

    try {
      const res = await addNewProduct(data);
      console.log(res);
    } catch (err) {
      handlerError(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="addProduct-container">
        <Sidebar />
        <div className="container">
          <h2>Add Product</h2>
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group col">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Product Name"
                onChange={(e) => setProdName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group col">
              <label htmlFor="category">Category</label>
              <select className="form-control" name="category">
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
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="form-control"
              />
            </div>
            <div className="form-group col">
              <label htmlFor="count">Avalible products</label>
              <input
                type="number"
                min={0}
                name="count"
                placeholder="Quantity of products in store"
                className="form-control"
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
              ></textarea>
            </div>
            <div className="form-group col">
              <label htmlFor="photos">Upload Images</label>
              <input
                type="file"
                multiple
                name="photos"
                onChange={(e) => setImages(e.target.files)}
                className="form-control"
              />
            </div>
            <div className="form-group col">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
