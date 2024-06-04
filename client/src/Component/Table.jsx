import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Table({ DeleteProduct, UpdatedProduct }) {
  const [data, setData] = useState([]);

  const getData = async function FeatchData() {
    try {
      const product = await axios.get("http://localhost:3000/api/v1/product");
      const response = product.data;
      // console.log(response.users)
      setData(response);
      // console.log(response.data.users.email, 'email')
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>Eduwork</h2>
              </div>
              <div className="col-sm-6">
                <a href="#" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addEmployeeModal">
                  <i className="material-icons">&#xE147;</i> <span>Add Product</span>
                </a>
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
              {data.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.status}</td>
                    <td>{product.image}</td>
                    <td>
                      <a href="#" className="edit cursor-pointer" data-bs-toggle="modal" data-bs-target="#editEmployeeModal" onClick={() => UpdatedProduct(product._id)}>
                        <i className="fas fa-edit" data-bs-toggle="tooltip" title="Edit">
                          &#xE254;
                        </i>
                      </a>
                      <a href="#" className="delete cursor-pointer" data-bs-toggle="modal" data-bs-target="#deleteEmployeeModal" onClick={() => DeleteProduct(product._id)}>
                        <i className="material-icons" data-bs-toggle="tooltip" title="delete">
                          &#xE872;
                        </i>
                      </a>
                      {/* <a className="delete" data-bas-toggle='modal' data-bs-target='#deleteEmployeeModal'><i className="material-icons" data-bs-toggle="tooltip" title="Delete">&#xE872;</i></a> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
