const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('../prisma/generated/prisma-client');
const query = require('./resolvers/query');
const mutation = require('./resolvers/mutation');

const resolvers = {
  Query: query,
  Mutation: mutation,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (req) => ({
    ...req,
    prisma,
  }),
});

const port = 80;
server.start(
  {
    port,
    bodyParserOptions: {
      limit: '10mb',
    },
  },
  () => console.log(`Server is running on http://localhost:${port}`)
);
