const express = require("express");
const { getAllOrders } = require("../../../controllers/admin/order-controller");

const router = express.Router();

router.get("/get", getAllOrders);

module.exports = router;
