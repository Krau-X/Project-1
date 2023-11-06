const Product = require("../models/producto");
const Restaurant = require("../models/restaurante");

class ProductController {
  static async getProducts(req, res) {
    try {
      let query = { habilitado: true };

      if (req.query.categorias) {
        query.categorias = { $in: req.query.categorias.split(",") };
      }

      if (req.query.restaurante) {
        const restaurant = await Restaurant.findOne({
          _id: req.query.restaurante,
          habilitado: true,
        });

        if (!restaurant) {
          return res.status(404).json({ message: "Restaurante no encontrado" });
        }
        query.restaurante = req.query.restaurante;
      }

      const products = await Product.find(query);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: err.message });
    }
  }

  static async getProduct(req, res) {
    try {
      const product = await Product.findOne({
        _id: req.params.id,
        habilitado: true,
      });

      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: err.message });
    }
  }

  static async createProduct(req, res) {
    try {
      const restaurant = await Restaurant.findOne({
        _id: req.body.restaurante,
        habilitado: true,
      });

      if (!restaurant) {
        return res.status(404).json({ message: "Restaurante no encontrado" });
      }

      const newProduct = new Product(req.body);
      await newProduct.save();

      restaurant.menu.push(newProduct._id);
      await restaurant.save();

      res.status(201).json({ message: "Producto creado" });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const { restaurante, ...updates } = req.body;

      const product = await Product.findByIdAndUpdate(productId, updates, { new: true });
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.json({ message: "Producto actualizado" });
    } catch (error) {
      res.status(400).json({ error: err.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, { habilitado: false });
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      
      const restaurant = await Restaurant.findById(product.restaurante);
      if (restaurant) {
        restaurant.menu.pull(product._id);
        await restaurant.save();
      }

      res.json({ message: "Producto inhabilitado con éxito" });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = ProductController;
