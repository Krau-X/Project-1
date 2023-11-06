const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Producto = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  restaurante: {
    type: Schema.Types.ObjectId,
    ref: "Restaurante",
    required: true,
    immutable: true,
  },
  precio: { type: Number, required: true },
  categorias: [{ type: String, required: true }],
  habilitado: { type: Boolean, default: true },
});

module.exports = model("Producto", Producto);
