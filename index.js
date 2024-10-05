import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";
import gql from 'graphql-tag';
//making typeDefs
const typeDefs = gql`
type Elecronics {
    id: ID!
    name: String!
}

type Query{
  getAllItems:[Elecronics]
  getItemById(id:ID!):Elecronics
  getItemByName(name:String!):[Elecronics]
}
`;

//make resolvers here tehy aer actual caller and they have whole data taht cann be minized by graphql

const resolvers = {
    Query: {
        // getAllItems: async () => { await axios.get("https://api.restful-api.dev/objects").data.select('id','name') }
        getAllItems: async () => {
            const response = await axios.get("https://api.restful-api.dev/objects");
            return response.data.map(item => ({
              id: item.id,
              name: item.name,
              data: item.data
            }));
          }
          
        
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);