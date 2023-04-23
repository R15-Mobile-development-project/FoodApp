const order = require("../models/orderModel");
require("dotenv").config();

const getOrders = (req, res) => {
  const orderMap = new Map();
  order.getOrders(req.userId, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error occurred",
      });
    }
    if (results.length === 0) {
      return res.status(400).json({
        message: "No order data was found for that user",
      });
    }

    results.forEach((entry) => {
      const {
        order_id,
        date,
        price,
        status,
        restaurant_id,
        user_id,
        item_name,
        item_price,
        restaurant_name,
      } = entry;

      if (!orderMap.has(order_id)) {
        orderMap.set(order_id, {
          order_id,
          date,
          price,
          status,
          restaurant_id,
          user_id,
          restaurant_name,
          items: [],
        });
      }

      const order = orderMap.get(order_id);
      order.items.push({
        item_name,
        item_price,
      });
    });

    const orderVals = Array.from(orderMap.values());
    const formattedOrders = orderVals.sort((a, b) => b.order_id - a.order_id);
    console.log(formattedOrders);
    return res.status(200).json(formattedOrders);
  });
};

module.exports = {
  getOrders,
};
