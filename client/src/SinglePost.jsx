import React from 'react';


import { GET_POST } from './graphql/post';
import { useQuery } from '@apollo/client/react';


const SinglePost = ({ postId }) => {
     const { data, loading, error } = useQuery(GET_POST, {
    variables: { id: postId }, // 👈 pass the post ID
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.post) return <p>Post not found</p>;

  const { post } = data;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </div>
  );
};

export default SinglePost;