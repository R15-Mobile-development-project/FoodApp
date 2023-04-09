const restaurant = require("../models/restaurantModel");
require("dotenv").config();

const restaurantAdd = (req, res) => {
  const { name, description, address, image, user_id, menus } = req.body;

  if (!name || !description || !address || !image || !user_id || !menus) {
    return res.status(400).json({ message: "Please fill in all fields" });
  } else {
    restaurant.add(
      name,
      description,
      address,
      image,
      user_id,
      menus,
      (err, results) => {
        if (err) {
          return res.status(500).json({
            message: "Error occured",
          });
        }
        return res.status(200).json({
          message: "Restaurant added",
        });
      }
    );
  }
};

module.exports = {
  restaurantAdd,
};