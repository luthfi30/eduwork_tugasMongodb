import React, { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/api/v1/product",
        {
          name,
          price,
          stock,
          status,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Product added successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
                        <input type="text" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} />
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
