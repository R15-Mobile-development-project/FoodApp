const db = require("../config/db");

const restaurant = {
  add: function (name, description, address, image, user_id, menus, callback) {
    const queryString = `INSERT INTO restaurants (name, description, address, image, user_id) VALUES (?, ?, ?, ?, ?);`;

    db.query(
      queryString,
      [name, description, address, image, user_id],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }

        const lastRestaurantId = result.insertId;

        const menuValues = menus.map((menu) => [
          menu.name,
          menu.price,
          lastRestaurantId,
        ]);
        const menuQueryString = `INSERT INTO menus (name, price, restaurant_id) VALUES ?;`;

        db.query(menuQueryString, [menuValues], (err, result) => {
          callback(err, result);
        });
      }
    );
  },
};

module.exports = restaurant;
