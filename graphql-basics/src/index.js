import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
  type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
  }
`

const resolvers = {
  Query: {
    hello() {
      return `hello!`
    },
    name() {
      return `Dom is my name!`
    },
    location() {
      return `St. Louis, MO`
    },
    bio() {
      return `My name is Dom and I live in STL.`
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log(`[server]: server is running at http://localhost:4000/`)
})
