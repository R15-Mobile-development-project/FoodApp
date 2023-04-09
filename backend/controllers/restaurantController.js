const restaurant = require("../models/restaurantModel");
require("dotenv").config();

const restaurantAdd = (req, res) => {
  const { name, description, address, image, menus } = req.body;

  if (!name || !description || !address || !image || !menus) {
    return res.status(400).json({ message: "Please fill in all fields" });
  } else if (description.length > 255) {
    const excessLength = description.length - 255;
    return res.status(400).json({
      message: `Description exceeds maximum length by ${excessLength} characters`,
    });
  } else {
    restaurant.add(
      name,
      description,
      address,
      image,
      req.userId,
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
