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
