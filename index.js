require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then((db) => console.log("Conectado a la base de datos"))
  .catch((err) => console.error(err));

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", require("./routes/userRoutes"));
app.use("/api/restaurantes", require("./routes/restaurantRoutes"));
app.use("/api/productos", require("./routes/productRoutes"));
app.use("/api/pedidos", require("./routes/pedidoRoutes"));

app.use((req, res) => {
  res.status(404).json({ error: 404 });
});

app.listen(process.env.PORT, () =>
  console.log("Server on port:", process.env.PORT)
);
