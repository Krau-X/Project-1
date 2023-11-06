const { Router } = require("express");

const  UserController= require("../controllers/userController");

const router = Router();

router.get("/", UserController.getUsers);

router.get("/:id", UserController.getUserByID);

router.post("/", UserController.createUser);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
