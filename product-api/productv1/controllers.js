const { ObjectId } = require("mongodb");
const Product = require("./models");

exports.addProduct = async (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file ? req.file.path : null;
  try {
    const newProduct = new Product({ name, price, stock, status, image });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file ? req.file.path : null;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.name = name;
    product.price = price;
    product.stock = stock;
    product.status = status;
    if (image) product.image = image;
    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.deleteOne({ _id: req.params.id });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};
