const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const restaurantController = require("../controllers/restaurantcontroller");
const orderController = require("../controllers/ordercontroller");

//user Routes
router.post("/register", (req, res) => {
  userController.register(req, res);
});

router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.put("/user/:id/reset", (req, res) => {
  userController.resetPassword(req, res);
});

//restaurant Routes
router.post("/restaurants", (req, res) => {
  restaurantController.addRestaurant(req, res);
});

router.get("/restaurants", (req, res) => {
  restaurantController.getAllRestaurants(req, res);
});

router.get("/restaurants/:id", (req, res) => {
  restaurantController.getRestaurantById(req, res);
});

router.get("/restaurants/:id/menu", (req, res) => {
  restaurantController.getRestaurantMenu(req, res);
});

router.post("/restaurants/:id/menu", (req, res) => {
  restaurantController.addMenuItem(req, res);
});

router.delete("/restaurants/:id/menu/:itemId", (req, res) => {
  restaurantController.deleteMenuItem(req, res);
});

//order Routes
router.post("/orders", (req, res) => {
  orderController.placeOrder(req, res);
});

router.get("/orders/:id", (req, res) => {
  orderController.getOrderDetails(req, res);
});

router.patch("/orders/:id", (req, res) => {
  orderController.updateOrderStatus(req, res);
});

module.exports = router;
