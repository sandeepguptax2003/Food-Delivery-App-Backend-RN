const Restaurant = require("../models/restaurant");

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRestaurantMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant.menu);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const addRestaurant = async (req, res) => {
  try {
    const { name, address, menu } = req.body;

    const restaurant = new Restaurant({
      name,
      address,
      menu,
    });

    await restaurant.save();

    res.status(201).json({ message: "Restaurant added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const addMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const newItem = {
      name,
      description,
      price,
      image,
    };

    restaurant.menu.push(newItem);
    await restaurant.save();

    res.status(201).json({ message: "Item added to the menu successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const { id, itemId } = req.params;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuIndex = restaurant.menu.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (menuIndex === -1) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    restaurant.menu.splice(menuIndex, 1);
    await restaurant.save();

    res.status(202).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantMenu,
  addRestaurant,
  addMenuItem,
  deleteMenuItem,
};
