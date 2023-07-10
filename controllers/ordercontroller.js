const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const User = require("../models/user");
const Restaurant = require("../models/restaurant");

//Place a new order
const placeOrder = async (req, res) => {
  try {
    const { userId, restaurantId, items, totalPrice, deliveryAddress } =
      req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const order = new Order({
      user: user._id,
      restaurant: restaurant._id,
      items,
      totalPrice,
      deliveryAddress,
      status: "placed",
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("restaurant", "name address");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  placeOrder,
  getOrderDetails,
  updateOrderStatus,
};
