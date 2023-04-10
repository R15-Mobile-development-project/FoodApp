const db = require("../config/db");
const bcrypt = require("bcrypt");

const orders = {

    getOrders: function (id, cb) {
        return db.query("select orders.*, restaurants.name as restaurant_name from orders join restaurants on restaurants.restaurant_id = orders.restaurant_id where orders.user_id = ?;", [id], cb)
    },

}

module.exports = orders;