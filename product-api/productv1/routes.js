const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addProduct, getProductById, updateProduct, deleteProduct, getAllProducts } = require("./controllers");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post("/product", upload.single("image"), addProduct);
router.get("/product/:id", getProductById);
router.patch("/product/:id", upload.single("image"), updateProduct);
router.delete("/product/:id", deleteProduct);
router.get("/products", getAllProducts);

module.exports = router;
