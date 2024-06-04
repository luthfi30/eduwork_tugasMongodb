import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Corrected import path for Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import ProductList from "./Component/ProductList";
import AddProduct from "./Component/AddProduct";
import UpdateProduct from "./Component/UpdatedProduct";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:id" element={<UpdateProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
