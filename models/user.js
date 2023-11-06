const mongoose = require("mongoose");

const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Funciones de validación
const validarCorreo = (correo) => regexCorreo.test(correo);

// Mensajes de error
const mensajeError = {
  correo: (valor) => `${valor} no es un correo electrónico válido!`,
  contraseña:
    "La contraseña debe contener al menos un número y por lo menos una letra",
};

const Usuario = new mongoose.Schema({
  correo: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validarCorreo,
      message: mensajeError.correo,
    },
  },
  primerNombre: { type: String, required: true, minLength: 1 },
  apellidos: { type: String, required: true, minLength: 1 },
  contraseña: {
    type: String,
    required: true,
    minlength: 8,
  },
  telefono: {
    type: String,
    required: true,
    unique: true,
  },
  direccion: {
    calle: { type: String, required: true },
    ciudad: { type: String, required: true },
    pais: { type: String, required: true },
  },
  funcion: { type: String, enum: ["Administrador", "Cliente"], required: true },
  habilitado: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Usuario", Usuario);
