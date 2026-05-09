const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/productos", productRoutes);
app.use("/api/ventas", saleRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API BOTICA FUNCIONANDO");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB conectado"))
.catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});