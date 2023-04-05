const db = require("../config/db");
const bcrypt = require("bcrypt");

const orders = {

    getOrders: function (id, cb) {
        return db.query("SELECT * FROM orders WHERE user_id = ?", [id], cb)
    },

}

module.exports = orders;