import { gql } from "@apollo/client";

// Queries
export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      description
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      description
    }
  }
`;

// Mutations

export const CREATE_POST = gql`
  mutation CreatePost($content: PostContentInput!) {
    createPost(content: $content) {
      id
      title
      description
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $content: PostContentInput!) {
    updatePost(id: $id, content: $content) {
      id
      title
      description
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

