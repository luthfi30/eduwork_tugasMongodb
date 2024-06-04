import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProductById();
  }, []);
  const getProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/product/${id}`);

      setName(response.data.name);
      setPrice(response.data.price);
      setStock(response.data.stock);
      setStatus(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/api/v1/product/${id}`, {
        name,
        price,
        stock,
        status,
      });

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
                    <h3>Edit Product</h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={UpdateProduct}>
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
                        Update
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
