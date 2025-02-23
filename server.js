console.log("Helloworld, How are you vikas Sharma ");


const punycode = require('punycode');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./src/config/db');
const typeDefs = require('./src/graphql/typeDefs');
const resolvers = require('./src/graphql/resolvers');

connectDB();

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(4000, () => console.log('🚀 Server running at http://localhost:4000/graphql'));
});
