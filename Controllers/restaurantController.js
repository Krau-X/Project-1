const Restaurant = require("../models/restaurante");
const User = require("../models/user");

class RestaurantController {
  static async getRestaurants(req, res) {
    try {
      let query = { habilitado: true };

      if (req.query.categorias) {
        query.categorias = { $in: req.query.categorias.split(",") };
      }

      if (req.query.nombre) {
        query.nombre = new RegExp(req.query.nombre, "i");
      }

      if (req.query.administrador) {
        query.administrador = req.query.administrador;
      }

      const restaurants = await Restaurant.find(query);
      res.status(200).json(restaurants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al buscar restaurantes" });
    }
  }

  static async getRestaurant(req, res) {
    try {
      const restaurant = await Restaurant.findOne({
        _id: req.params.id,
        habilitado: true,
      });
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurante no encontrado" });
      }
      res.json(restaurant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: err.message });
    }
  }

  static async createRestaurant(req, res) {
    try {
      const user = await User.findOne({
        _id: req.body.administrador,
        habilitado: true,
      });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const newRestaurant = new Restaurant(req.body);
      await newRestaurant.save();
      res.status(201).json({ message: "Restaurante creado" });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateRestaurant(req, res) {
    try {
      const { administrador, ...updates } = req.body;

      if (administrador) {
        const user = await User.findOne({ _id: administrador, habilitado: true });
        if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
        updates.administrador = administrador;
      }

      const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, updates, { new: true });
      if (!updatedRestaurant) {
        return res.status(404).json({ message: "Restaurante no encontrado" });
      }
      res.json({ message: "Restaurante actualizado" });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteRestaurant(req, res) {
    try {
      const deletedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, { habilitado: false });
      if (!deletedRestaurant) {
        return res.status(404).json({ message: "Restaurante no encontrado" });
      }
      res.json({ message: "Restaurante inhabilitado con éxito" });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = RestaurantController;
