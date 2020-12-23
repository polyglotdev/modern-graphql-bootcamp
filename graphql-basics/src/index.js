import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
  type Query {
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

const resolvers = {
  Query: {
    me() {
      return {
        id: `B8522484-83A6-4003-A4A7-5EFA160592A9`,
        username: `generating-flexibility`,
        email: `synthesizebluetoothcircuit@gmail.com`
      }
    },
    post() {
      return {
        id: `4BDD6144-A0C7-4423-8123-635491908E51`,
        title: `I like GraphQL`,
        body: `GraphQL is not a language, it's a specification.`,
        published: false
      }
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log(`[server]: server is running at http://localhost:4000`)
})
