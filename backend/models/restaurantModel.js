const db = require("../config/db");

const restaurant = {
  add: function (name, description, address, image, user_id, menus, callback) {
    const menuValues = menus
      .map((menu) => `('${menu.name}', ${menu.price}, LAST_INSERT_ID())`)
      .join(",");
    const queryString = `INSERT INTO restaurants (name, description, address, image, user_id) VALUES (?, ?, ?, ?, ?); INSERT INTO menus (name, price, restaurant_id) VALUES ${menuValues};`;

    return db.query(
      queryString,
      [name, description, address, image, user_id],
      callback
    );
  },
};

module.exports = restaurant;
