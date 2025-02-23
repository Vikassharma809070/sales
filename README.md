# Sales & Revenue Analytics API

## Overview

This is a GraphQL API for an e-commerce platform that provides analytics on revenue, customer spending behavior, and product sales trends. The API interacts with a MongoDB database and uses GraphQL to serve efficient queries.

## Features

- Get total spending, last purchase date, and average order value for a customer.
- Fetch top-selling products based on total quantity sold.
- Retrieve sales analytics, including total revenue, number of completed orders, and revenue breakdown by category.
- MongoDB Aggregation Pipelines for efficient data retrieval.
- Optimized for performance using indexes and efficient lookups.

## Technologies Used

- Node.js
- Express.js
- GraphQL
- Apollo Server
- MongoDB (Mongoose ORM)
- Redis (for caching analytics queries)
- Docker (for containerized deployment)

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js (v16+ recommended)
- MongoDB (local or cloud instance)
- Docker (optional, for containerization)

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/sales-revenue-analytics-api.git
cd sales-revenue-analytics-api
Install dependencies:

bash
npm install
Set up the environment variables:

Create a .env file and configure the required variables:

plaintext
MONGO_URI=mongodb://localhost:27017/sales_db
PORT=4000
Import sample data:

bash
node seed.js
Start the development server:

bash
npm start
Running with Docker
Build and run the Docker container:

bash
docker-compose up --build
Access the API at http://localhost:4000/graphql

GraphQL Queries
1. Get Customer Spending
graphql
query {
  getCustomerSpending(customerId: "63f8b3d5a7b1d7f3b0a2c5e1") {
    customerId
    totalSpent
    averageOrderValue
    lastOrderDate
  }
}
2. Get Top Selling Products
graphql
query {
  getTopSellingProducts(limit: 5) {
    productId
    name
    totalSold
  }
}
3. Get Sales Analytics
graphql
query {
  getSalesAnalytics(startDate: "2024-01-01", endDate: "2024-06-30") {
    totalRevenue
    completedOrders
    categoryBreakdown {
      category
      revenue
    }
  }
}
Future Improvements
Add a mutation for placing an order.

Implement pagination for getCustomerOrders.

Enhance query performance with Redis caching.

License
This project is licensed under the MIT License.


Feel free to copy and paste this into your `README.md` file. If you have any further quries.