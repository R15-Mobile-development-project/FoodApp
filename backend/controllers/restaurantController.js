// Import the restaurant model and load environment variables
const restaurant = require("../models/restaurantModel");
require("dotenv").config();

// Controller function to add a new restaurant
const restaurantAdd = (req, res) => {
  // Extract data from request body
  const { name, description, address, image, menus } = req.body;

  // Check if all required fields are filled
  if (!name || !description || !address || !image || !menus) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  // Check if the length of the description field is within limit
  else if (description.length > 255) {
    const excessLength = description.length - 255;
    return res.status(400).json({
      message: `Description exceeds maximum length by ${excessLength} characters`,
    });
  }

  // Check if all menu items have valid data types
  for (const menu of menus) {
    if (typeof menu.name !== "string" || parseFloat(menu.price) != menu.price) {
      return res.status(400).json({
        message: "Invalid menu values",
      });
    }
  }

  // Prepare data object with additional user_id field and add new restaurant to database
  const data = { name, description, address, image, user_id: req.userId };
  restaurant.addRestaurant(data, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error occurred",
        console: err,
      });
    }

    // Get the last inserted restaurant id and add menu items to database
    const lastRestaurantId = result.insertId;
    const menuValues = menus.map((menu) => [
      menu.name,
      menu.price,
      lastRestaurantId,
    ]);

    restaurant.addMenus(menuValues, (err, result) => {
      if (err) {
        // If restaurant already exists, send error message with status code 400
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

// Controller function to get list of all restaurants
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

// Controller function to get restaurant(s) by user id
const restaurantGetByUserId = (req, res) => {
  // Call the model function to get the restaurants owned by the logged-in user
  restaurant.getRestaurantByUserId(req.userId, (err, results) => {
    if (err) {
      // Send error message with status code 500 if an error occurred while fetching data
      return res.status(500).json({
        message: "Error occurred",
        console: err,
      });
    }

    // Group restaurants and menu items by restaurant id to format the response
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

    // Convert the grouped results object into an array and remove user_id and restaurant_id fields from the first element
    const formattedResults = Object.values(groupedResults);
    if (formattedResults.length > 0) {
      delete formattedResults[0].user_id;
      delete formattedResults[0].restaurant_id;
      return res.status(200).json(formattedResults);
    } else {
      // Send error message with status code 404 if no restaurants are found for the logged-in user
      return res.status(404).json({
        message: "No restaurants found",
      });
    }
  });
};
const restaurantUpdate = (req, res) => {
  const { name, description, address, image, menus } = req.body;

  // Check if all required fields are present
  if (!name || !description || !address || !image || !menus) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  // Check if the description length is not greater than 255
  else if (description.length > 255) {
    const excessLength = description.length - 255;
    return res.status(400).json({
      message: `Description exceeds maximum length by ${excessLength} characters`,
    });
  }

  // Validate each menu has a valid name and price
  for (const menu of menus) {
    if (typeof menu.name !== "string" || parseFloat(menu.price) != menu.price) {
      return res.status(400).json({
        message: "Invalid menu values",
      });
    }
  }

  // Get restaurant ID by user ID and update restaurant details in database
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

    // Update restaurant details in database
    restaurant.updateRestaurant(id, data, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error occurred",
          console: err,
        });
      }

      // Delete all menus associated with the restaurant
      restaurant.deleteMenus(id, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Error occurred",
            console: err,
          });
        }

        // Insert new menus provided in the request body
        const menuValues = menus.map((menu) => [menu.name, menu.price, id]);
        restaurant.addMenus(menuValues, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: "Error occurred",
              console: err,
            });
          }

          // Send success response with message
          return res.status(200).json({
            message: "Restaurant updated",
          });
        });
      });
    });
  });
};

const restaurantDelete = (req, res) => {
  // Get the restaurant ID for the user making the request
  restaurant.getRestaurantIdByUserId(req.userId, (err, results) => {
    if (err || results.length === 0) {
      // Return an error if there was a problem retrieving the ID
      return res.status(500).json({
        message: "Error occurred",
        console: err,
      });
    }

    // Extract the ID from the query results
    const id = results[0].restaurant_id;

    // Delete all menus associated with the restaurant
    restaurant.deleteMenus(id, (err, result) => {
      if (err) {
        // Return an error if there was a problem deleting the menus
        return res.status(500).json({
          message: "Error occurred",
          console: err,
        });
      }

      // Delete the restaurant itself
      restaurant.deleteRestaurant(id, (err, result) => {
        if (err) {
          // Return an error if there was a problem deleting the restaurant
          return res.status(500).json({
            message: "Error occurred",
            console: err,
          });
        }

        // Return a success message if the deletion was successful
        return res.status(200).json({
          message: "Restaurant deleted",
        });
      });
    });
  });
};

const restaurantCountByUserId = (req, res) => {
  // Get the number of restaurants associated with the user making the request
  restaurant.restaurantCount(req.userId, (err, results) => {
    if (err) {
      // Return an error if there was a problem retrieving the count
      return res.status(500).json({
        message: "Error occurred",
        console: err,
      });
    }

    if (results.length > 0) {
      // Return the count as JSON if it exists
      return res.status(200).json(results[0]);
    } else {
      // Return an error if the count could not be retrieved
      return res.status(404).json({
        message: "No restaurants found",
      });
    }
  });
};

const restaurantByPage = (req, res) => {
  // Parse the requested page number from the request URL
  const page = parseInt(req.params.page) || 1;

  // Calculate the offset for the requested page
  const offset = (page - 1) * 6;

  // Retrieve restaurant data for the requested page
  restaurant.getByPage(offset, (err, results) => {
    if (err) {
      // Return an error if there was a problem retrieving the data
      console.log(err);
      return res.status(500).json({
        message: "Error occurred",
        console: err,
      });
    }

    if (results.length > 0) {
      // Return the restaurant data as JSON if it exists
      return res.status(200).json(results);
    } else {
      // Return an error if the page number is invalid
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
