import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useEffect } from "react";

const EditProduct = () => {
  const [editProd, setEditProd] = useState({});
  const [prodName, setProdName] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const prodId = location.state.prodId;

  useEffect(() => {
    fetch(`https://tmdt.vercel.app/admin/edit-product/${prodId}`)
      .then((res) => res.json())
      .then((data) => {
        setEditProd(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditProd({ ...editProd, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postEditProd = async () => {
      const response = await axios.post(
        `https://tmdt.vercel.app/admin/edit-product/${prodId}`,
        editProd
      );

      if (response.status === 201) {
        navigate("/products");
      }
    };
    postEditProd();
  };

  return (
    <div>
      <Header />
      <div className="addProduct-container">
        <Sidebar />
        <div className="addProduct">
          <h1>Update Product</h1>
          <div className="addProduct-form">
            <div className="form-control">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Product Name"
                onChange={(e) => handleChange(e)}
                defaultValue={editProd.name}
              />
            </div>
            <div className="form-control">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                name="category"
                placeholder="Enter Category"
                defaultValue={editProd.category}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                multiple
                name="price"
                onChange={(e) => handleChange(e)}
                placeholder="Enter price"
                defaultValue={editProd.price}
              />
            </div>
            <div className="form-control">
              <label htmlFor="short_desc">Short Description</label>
              <textarea
                type="text"
                name="short_desc"
                placeholder="Enter Short Description"
                rows={5}
                onChange={(e) => handleChange(e)}
                defaultValue={editProd.short_desc}
              ></textarea>
            </div>
            <div className="form-control">
              <label htmlFor="long_desc">Long Description</label>
              <textarea
                type="text"
                name="long_desc"
                placeholder="Enter Long Description"
                rows={10}
                onChange={(e) => handleChange(e)}
                defaultValue={editProd.long_desc}
              ></textarea>
            </div>
            <div className="form-control">
              <label htmlFor="images">Upload Images (4 images)</label>
              <input
                type="file"
                multiple
                name="images"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-control">
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
