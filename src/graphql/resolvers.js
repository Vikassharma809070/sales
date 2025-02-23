const Order = require('../models/Order');
const Product = require('../models/Product');
const client = require('../config/redis');

const resolvers = {
  Query: {
    getCustomerSpending: async (_, { customerId }) => {
      const cached = await client.get(`customer:${customerId}`);
      if (cached) return JSON.parse(cached);

      const result = await Order.aggregate([
        { $match: { customerId } },
        {
          $group: {
            _id: "$customerId",
            totalSpent: { $sum: "$totalAmount" },
            averageOrderValue: { $avg: "$totalAmount" },
            lastOrderDate: { $max: "$orderDate" },
          },
        },
      ]);

      const response = result[0] || { totalSpent: 0, averageOrderValue: 0, lastOrderDate: null };
      await client.setEx(`customer:${customerId}`, 3600, JSON.stringify(response));

      return response;
    },

    getTopSellingProducts: async (_, { limit }) => {
      const result = await Order.aggregate([
        { $unwind: "$products" },
        {
          $group: {
            _id: "$products.productId",
            totalSold: { $sum: "$products.quantity" },
          },
        },
        { $sort: { totalSold: -1 } },
        { $limit: limit },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $project: {
            productId: "$_id",
            name: "$product.name",
            totalSold: 1,
          },
        },
      ]);

      return result;
    },

    getSalesAnalytics: async (_, { startDate, endDate }) => {
      const cached = await client.get(`analytics:${startDate}:${endDate}`);
      if (cached) return JSON.parse(cached);

      const result = await Order.aggregate([
        { $match: { orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) }, status: "completed" } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalAmount" },
            completedOrders: { $sum: 1 },
          },
        },
      ]);

      const response = result[0] || { totalRevenue: 0, completedOrders: 0, categoryBreakdown: [] };
      await client.setEx(`analytics:${startDate}:${endDate}`, 3600, JSON.stringify(response));

      return response;
    },
  },
};

module.exports = resolvers;
