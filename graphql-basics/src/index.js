import { GraphQLServer } from 'graphql-yoga'
import { posts } from '../scratchpad/posts'

const users = [
  {
    id: `1`,
    name: `Dom`,
    email: `Dom_Hallan@example.com`,
    age: 37
  },
  {
    id: `2`,
    name: `Elijah`,
    email: `Elijah_Hallan61@example.net`,
    age: 5
  },
  {
    id: `3`,
    name: 'Ezra',
    email: `Ezra.Hallan78@example.org`,
    age: 3
  }
]

const comments = [
  {
    id: `102`,
    text: `This is cool`,
    author: `1`,
    post: `10`
  },
  {
    id: `103`,
    text: `This is great!`,
    author: `2`,
    post: `11`
  },
  {
    id: `104`,
    text: `This is awesome!!`,
    author: `3`,
    post: `12`
  },
  {
    id: `105`,
    text: `This was helpful 👍🏾!`,
    author: `1`,
    post: `12`
  }
]

const typeDefs = `
  type Query {
    me: User!
    post: Post!
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
  }


  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`

const resolvers = {
  Query: {
    me() {
      return {
        id: `B8522484-83A6-4003-A4A7-5EFA160592A9`,
        username: `generating-flexibility`,
        email: `synthesizebluetoothcircuit@gmail.com`,
        age: 36
      }
    },
    post() {
      return {
        id: `4BDD6144-A0C7-4423-8123-635491908E51`,
        title: `I like GraphQL`,
        body: `GraphQL is not a language, it's a specification.`,
        published: false
      }
    },
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts
      }
      return posts.filter((post) => {
        return post.title.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    comments() {
      return comments
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id
      })
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id
      })
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post
      })
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
