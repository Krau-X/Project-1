const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const direccion = new Schema({
  calle: { type: String, required: true },
  ciudad: { type: String, required: true },
  pais: { type: String, required: true },
});

const Restaurante= new Schema({
  nombre: { type: String, required: true },
  direccion: { type: direccion, required: true },
  categorias: [{ type: String, required: true }],
  popularidad: { type: Number, default: 0, min: 0, max: 5 },
  menu: [{ type: Schema.Types.ObjectId, ref: "Producto" }],
  administrador: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  habilitado: { type: Boolean, default: true },
});

module.exports = model("Restaurante", Restaurante);
