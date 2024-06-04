const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });

const { index, view, create, update, remove } = require("./controller");

router.get("/product", index);
router.get("/product/:id", view);
router.post("/product", upload.single("image"), create); // Add multer middleware
router.put("/product/:id", upload.single("image"), update);
router.delete("/product/:id", remove);

module.exports = router;
