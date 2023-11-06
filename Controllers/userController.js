const { error } = require("console");
const User = require("../models/user");

class UserController {
  static async getUsers(req, res) {
    try {
      const { email, password } = req.query;
      let query = { habilitado: true };
      
      if (email && password) {
        query = { ...query, email, password };
        const user = await User.findOne(query);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        return res.json(user);
      } 
      
      const users = await User.find(query);
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  static async getUserByID(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id, habilitado: true });
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({error: err.message  });
    }
  }

  static async createUser(req, res) {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).send(newUser);
    } catch (err) {
      res.status(500).json({error: err.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });
      res.json({ message: "Usuario actualizado" });
    } catch (err) {
      res.status(500).json({error: err.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndUpdate(req.params.id, { habilitado: false });
      if (!deletedUser) return res.status(404).json({ message: "Usuario no encontrado" });
      res.json({ message: "Usuario inhabilitado" });
    } catch (err) {
      res.status(500).json({error: err.message });
    }
  }
}

module.exports = UserController;
