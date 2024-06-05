import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("status", status);
      formData.append("image", file);

      const response = await axios.post("https://product-api-alpha.vercel.app/api/v1/product ", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("Product added successfully");
        navigate("/");
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div>
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-8 ">
            <div className="row  pt-md-5 mt-md-5 mb-5">
              <div className="col-12">
                <div className="card">
                  <div className="card-title text-center mt-3">
                    <h3>Add Product</h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={saveProduct}>
                      <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Price</label>
                        <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Stock</label>
                        <input type="text" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} />
                      </div>

                      <div className="form-group">
                        <label>Status</label>
                        <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                          <option value="">-- status --</option>
                          <option value="True">True</option>
                          <option value="False">False</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Image</label>
                        <input type="file" className="form-control" onChange={handleFileChange} />
                        {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: "100px", height: "100px" }} />}
                      </div>

                      <button type="submit" className="btn btn-dark mt-5 mx-auto d-block">
                        Add Product
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
