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
  }

  for (const menu of menus) {
    if(typeof menu.name !== "string" || parseFloat(menu.price) != menu.price ){
      return res.status(400).json({
        message: "Invalid menu values"
      })
    }
  }

  const data = { name, description, address, image, user_id: req.userId };
  restaurant.addRestaurant(data, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error occurred",
        console: err,
      });
    }

    const lastRestaurantId = result.insertId;
    const menuValues = menus.map((menu) => [
      menu.name,
      menu.price,
      lastRestaurantId,
    ]);

    restaurant.addMenus(menuValues, (err, result) => {
      if (err) {
        if (err.errno === 1062) {
          return res.status(400).json({
            message: "Restaurant already exists",
          });
        } else {
          return res.status(500).json({
            message: "Error occurred",
            console: err,
          });
        }
      }

      return res.status(200).json({
        message: "Restaurant added",
      });
    });
  });
};

const restaurantList = (req, res) => {
  restaurant.getAll((err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error occurred",
        console: err,
      });
    } else {
      return res.status(200).json(results);
    }
  });
};

const restaurantGetByUserId = (req, res) => {
  restaurant.getRestaurantByUserId(req.userId, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error occurred",
        console: err,
      });
    }

    const groupedResults = {};
    results.forEach((row) => {
      if (!groupedResults[row.restaurant_id]) {
        groupedResults[row.restaurant_id] = {
          restaurant_id: row.restaurant_id,
          name: row.name,
          description: row.description,
          address: row.address,
          image: row.image,
          user_id: row.user_id,
          menus: [],
        };
      }
      if (row.menu_id) {
        groupedResults[row.restaurant_id].menus.push({
          menu_id: row.menu_id,
          name: row.menu_name,
          price: row.menu_price,
        });
      }
    });

    const formattedResults = Object.values(groupedResults);

    if (formattedResults.length > 0) {
      delete formattedResults[0].user_id;
      delete formattedResults[0].restaurant_id;
      return res.status(200).json(formattedResults);
    } else {
      return res.status(404).json({
        message: "No restaurants found",
      });
    }
  });
};
const restaurantUpdate = (req, res) => {
  const { name, description, address, image, menus } = req.body;

  if (!name || !description || !address || !image || !menus) {
    return res.status(400).json({ message: "Please fill in all fields" });
  } else if (description.length > 255) {
    const excessLength = description.length - 255;
    return res.status(400).json({
      message: `Description exceeds maximum length by ${excessLength} characters`,
    });
  }

  for (const menu of menus) {
    if(typeof menu.name !== "string" || parseFloat(menu.price) != menu.price ){
      return res.status(400).json({
        message: "Invalid menu values"
      })
    }
  }
  
  restaurant.getRestaurantIdByUserId(req.userId, (err, results) => {
    if (err || results.length === 0) {
      console.log(err);
      return res.status(500).json({
        message: "Error occurred",
        console: err,
      });
    }

    const id = results[0].restaurant_id;
    const data = { name, description, address, image };

    restaurant.updateRestaurant(id, data, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error occurred",
          console: err,
        });
      }

      restaurant.deleteMenus(id, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Error occurred",
            console: err,
          });
        }

        const menuValues = menus.map((menu) => [menu.name, menu.price, id]);

        restaurant.addMenus(menuValues, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: "Error occurred",
              console: err,
            });
          }

          return res.status(200).json({
            message: "Restaurant updated",
          });
        });
      });
    });
  });
};

const restaurantDelete = (req, res) => {
  restaurant.getRestaurantIdByUserId(req.userId, (err, results) => {
    if (err || results.length === 0) {
      return res.status(500).json({
        message: "Error occurred",
        console: err,
      });
    }

    const id = results[0].restaurant_id;

    restaurant.deleteMenus(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error occurred",
          console: err,
        });
      }

      restaurant.deleteRestaurant(id, (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Error occurred",
            console: err,
          });
        }

        return res.status(200).json({
          message: "Restaurant deleted",
        });
      });
    });
  });
};

const restaurantCountByUserId = (req, res) => {
  restaurant.restaurantCount(req.userId, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error occurred",
        console: err,
      });
    }

    if (results.length > 0) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(404).json({
        message: "No restaurants found",
      });
    }
  });
};

const restaurantByPage = (req, res) => {
  const page = parseInt(req.params.page) || 1;

  const offset = (page - 1) * 6;

  restaurant.getByPage(offset, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error occurred",
        console: err,
      });
    }

    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      res.status(400).json({
        message: "Invalid page",
      });
    }
  });
};

module.exports = {
  restaurantAdd,
  restaurantGetByUserId,
  restaurantUpdate,
  restaurantList,
  restaurantDelete,
  restaurantCountByUserId,
  restaurantByPage,
};
