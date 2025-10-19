import gql from "graphql-tag";

export const postTypeDefs = gql`
  # Enum for post status
  enum PostStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }

  type Post {
    id: ID!
    title: String!
    description: String
    status: PostStatus!   # Use Enum type here
  }

  input PostContentInput {
    title: String!
    description: String
    status: PostStatus!   # Enum used inside input too
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createPost(content: PostContentInput!): Post!
    updatePost(id: ID!, content: PostContentInput!): Post!
    deletePost(id: ID!): Post!
  }
`;



// mutation createPost {
//   createPost(
//     content: {
//       title: "Learn Apollo"
//       description: "Understanding Shema"
//       status: PUBLISHED
//     }
//   ) {
//     id
//     title
//     description
//     status
//   }
// }
