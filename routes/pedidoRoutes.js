const { Router } = require("express");

const PedidoController = require("../controllers/pedidoController");

const router = Router();

router.get("/", PedidoController.getOrders);

router.get("/:id", PedidoController.getOrder);

router.post("/", PedidoController.createOrder);

router.put("/:id", PedidoController.updateOrder);

router.delete("/:id", PedidoController.deleteOrder);

module.exports = router;
