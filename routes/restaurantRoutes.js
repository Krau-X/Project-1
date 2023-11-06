const { Router } = require("express");

const restaurantController = require("../controllers/restaurantController");

const router = Router();

router.get("/", restaurantController.getRestaurants);

router.get("/:id", restaurantController.getRestaurant);

router.post("/", restaurantController.createRestaurant);

router.put("/:id", restaurantController.updateRestaurant);

router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;