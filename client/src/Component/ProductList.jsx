import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      const response = await axios.get("https://product-84ryfzk29-luthfis-projects-6cefe16f.vercel.app/api/v1/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://product-84ryfzk29-luthfis-projects-6cefe16f.vercel.app/api/v1/product/${id}`);
      onDelete(id);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>Eduwork</h2>
              </div>
              <div className="col-sm-6">
                <Link to="add" className="btn btn-success">
                  <i className="material-icons">&#xE147;</i> <span>Add Product</span>
                </Link>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Stock</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.status}</td>
                  <td>{product.stock}</td>
                  <td>{product.image}</td>
                  <td>
                    <Link to={`edit/${product._id}`} className="edit cursor-pointer">
                      <i className="material-icons" data-bs-toggle="tooltip" title="Edit">
                        &#xE254;
                      </i>
                    </Link>

                    <button onClick={() => deleteProduct(product._id)} className="delete cursor-pointer btn btn-sm">
                      <i className="material-icons" data-bs-toggle="tooltip" title="Edit">
                        &#xE872;
                      </i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
