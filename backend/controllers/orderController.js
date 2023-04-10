const order = require("../models/orderModel");
const bcrypt = require("bcrypt");
const jwt = require("../config/jwt");
require("dotenv").config();

const getOrders = (req, res) => {
    order.getOrders(req.userId, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Error occured",
            });
        }
        if (results.length === 0) {
            return res.status(400).json({
                message: "No order data was found for that user",
            });
        }
        console.log(results);
        res.json(results);
    });
};

module.exports = {
    getOrders,
};