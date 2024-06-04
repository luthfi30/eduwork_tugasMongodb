const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongodb");
const fs = require("fs");
const path = require("path");
const index = (req, res) => {
  const db = getDb();
  db.collection("products")
    .find()
    .toArray()
    .then((result) => {
      console.log("Data retrieved: ", result);
      res.send(result);
    })
    .catch((error) => {
      console.error("Error retrieving data: ", error);
      res.send(error);
    });
};
const view = (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const objectId = new ObjectId(id);

  db.collection("products")
    .findOne({ _id: ObjectId })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};
const create = (req, res) => {
  const db = getDb();
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../uploads", image.originalname); // Save the image path
    fs.renameSync(image.path, target);
    db.collection("products")
      .insertOne({ name, price, stock, status, image: `http://localhost:3000/public/${image.originalname}` })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

const update = (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { name, price, stock, status } = req.body;
  const image = req.file;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Invalid product ID format");
  }

  // Jika ada file gambar yang diunggah
  if (image) {
    const target = path.join(__dirname, "../uploads", image.originalname);
    fs.renameSync(image.path, target); // Simpan path gambar

    db.collection("products")
      .findOneAndUpdate(
        { _id: new ObjectId(id) }, // Menggunakan 'new' saat membuat instance ObjectId
        { $set: { name, price, stock, status, image: `http://localhost:3000/public/${image.originalname}` } },
        { returnOriginal: false }
      )
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  } else {
    // Jika tidak ada file gambar yang diunggah
    db.collection("products")
      .findOneAndUpdate(
        { _id: new ObjectId(id) }, // Menggunakan 'new' saat membuat instance ObjectId
        { $set: { name, price, stock, status } },
        { returnOriginal: false }
      )
      .then((result) => {
        if (!result.value) {
          return res.status(404).send({ message: "Product not found" });
        }
        res.send({ message: "Product updated successfully", product: result.value });
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        res.status(500).send("Error updating product");
      });
  }
};

const remove = (req, res) => {
  const db = getDb();
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Invalid product ID format");
  }

  const objectId = new ObjectId(id);
  db.collection("products")
    .deleteOne({ _id: objectId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).send({ message: "Product not found" });
      }
      res.send({ message: "Product deleted successfully" });
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
      res.status(500).send("Error deleting product");
    });
};

module.exports = { index, view, create, update, remove };
