const Product = require("../models/producto");
const Order = require("../models/pedido");
const Restaurant = require("../models/restaurante");
const User = require("../models/user");

class PedidoController {
  static async getOrders(req, res) {
    try {
      const { usuario, restaurante } = req.query;
      const query = { habilitado: true };

      if (usuario) {
        query.usuario = usuario;
      }
      if (restaurante) {
        query.restaurante = restaurante;
      }

      const orders = await Order.find(query);
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getOrder(req, res) {
    try {
      const order = await Order.findOne({
        _id: req.params.id,
        habilitado: true,
      });
      if (!order) {
        return res.status(404).json({ error: "Pedido no encontrado" });
      }
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createOrder(req, res) {
    try {
      const orderData = req.body;

      const user = await User.findOne({
        _id: orderData.usuario,
        habilitado: true,
      });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const restaurant = await Restaurant.findOne({
        _id: orderData.restaurante,
        habilitado: true,
      });
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurante no encontrado" });
      }

      orderData.total = 0;

      for (const element of orderData.items) {
        const product = await Product.findOne({
          _id: element.producto,
          habilitado: true,
        });
        if (!product) {
          return res
            .status(404)
            .json({ message: `Producto ${element.producto} no encontrado` });
        }
        orderData.total+= product.precio*element.cantidad;
      }

      const newOrder = new Order(orderData);
      await newOrder.save();

      res.status(201).json({ message: "Pedido creado" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateOrder(req, res) {
    try {
      const orderId = req.params.id;
      const { usuario, restaurante, items, total, ...updates } = req.body;

      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: "Pedido no encontrado" });
      }

      if (order.estado === "Enviado") {
        return res.status(400).json({
          error: "No se puede modificar un pedido en estado 'Enviado'",
        });
      }

      Object.assign(order, updates);
      await order.save();

      res.json(order);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async deleteOrder(req, res) {
    try {
      const orderId = req.params.id;
      const order = await Order.findByIdAndUpdate(orderId, {
        habilitado: false,
      });

      if (!order) {
        return res.status(404).json({ error: "Pedido no encontrado" });
      }

      res.json({ message: "Pedido inhabilitado" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = PedidoController;
