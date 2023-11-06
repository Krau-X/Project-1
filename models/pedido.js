const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const item = new Schema({
  producto: { type: Schema.Types.ObjectId, ref: "Producto", required: true },
  cantidad: { type: Number, required: true },
});

const Pedido = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
    immutable: true,
  },
  restaurante: {
    type: Schema.Types.ObjectId,
    ref: "Restaurante",
    required: true,
    immutable: true,
  },
  items: [{ type: item, required: true }],
  estado: {
    type: String,
    enum: ["Creado", "En Curso", "En Camino", "Entregado"],
    default: "Creado",
  },
  puntuacion: { type: Number, default: 0, min: 0, max: 5 },
  total: { type: Number, required: true },
  habilitado: { type: Boolean, default: true },
});

module.exports = model("Pedido", Pedido);
