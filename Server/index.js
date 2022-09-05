const { ApolloServer } = require("apollo-server");
const resolvers = require('./resolver');
const typeDefs = require("./Schema");
const TrackAPI= require('./database')

const server = new ApolloServer({ typeDefs, resolvers,
    dataSources: () => {
        return {
          trackAPI: new TrackAPI()
        };
      }
   
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
