const { GraphQLScalarType } = require("graphql");
const { ApolloServer } = require("apollo-server");
const { makeExecutableSchema } = require("graphql-tools");
const { importSchema } = require("graphql-import");
const typeDefs = importSchema("../schema.graphql");

const resolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "DateTime",
    serialize(data) {
      return data.toISOString();
    },
    parseValue(data) {
      return new Date(data);
    },
    parseLiteral(ast) {
      return new Date(ast.value);
    }
  })
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({
  schema,
  mocks: {
    DateTime: () => {
      return new Date();
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
