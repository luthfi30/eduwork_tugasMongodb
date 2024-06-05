const express = require("express");
const path = require("path");
const logger = require("morgan");
const { connectToDatabase } = require("./config/mongodb");
const productRouterv1 = require("./productv1/routes");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "https://tugas-eduwork-mern-h3r7itq4a-luthfis-projects-6cefe16f.vercel.app", // Ganti dengan asal permintaan React.js Anda
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1", productRouterv1);

app.use((req, res) => {
  res.status(404).json({
    status: "failed",
    message: `Resource ${req.originalUrl} not found`,
  });
});

const port = 4000;

(async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => console.log("Server running on port http://localhost:4000"));
  } catch (error) {
    console.error("Failed to start server:", error);
  }
})();
