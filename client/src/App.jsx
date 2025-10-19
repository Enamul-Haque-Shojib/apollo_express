
import './App.css'

import React, { useState } from "react";

import { GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST } from "./graphql/post.js";
import { useMutation, useQuery } from '@apollo/client/react';
import SinglePost from './SinglePost.jsx';

function App() {
  const { data, loading, error, refetch } = useQuery(GET_POSTS);
  const [createPost] = useMutation(CREATE_POST);
  const [updatePost] = useMutation(UPDATE_POST);
  const [deletePost] = useMutation(DELETE_POST);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  console.log('--->>>',description)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCreate = async () => {
  await createPost({
    variables: {
      content: {
        title,
        description,
      },
    },
  });
  setTitle("");
  setDescription("");
  refetch();
};


  const handleUpdate = async (id) => {
  const newTitle = prompt("Enter new title:");
  const newDescription = prompt("Enter new description:");
  await updatePost({
    variables: {
      id,
      content: {
        title: newTitle,
        description: newDescription,
      },
    },
  });
  refetch();
};


  const handleDelete = async (id) => {
    if (confirm("Are you sure to delete?")) {
      await deletePost({ variables: { id } });
      refetch();
    }
  };

  return (
    <>
    <div style={{ padding: 20 }}>
      <h1>Posts</h1>
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleCreate}>Create Post</button>
      </div>

      {data.posts.map((post) => (
        <div key={post.id} style={{ marginBottom: 10, border: "1px solid #ccc", padding: 10 }}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <button onClick={() => handleUpdate(post.id)}>Update</button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
    <h1>Single Post</h1>
    <SinglePost postId="2" />
    </>
  );
}

export default App;

