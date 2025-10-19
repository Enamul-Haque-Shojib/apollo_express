import prisma from "../../prisma/client.js";

export const postResolvers = {
  Query: {
    // Fetch all posts
    posts: async () => {
      return prisma.post.findMany();
    },

    // Fetch a single post by ID
    post: async (_, { id }) => {
      const postId = parseInt(id);
      const post = await prisma.post.findUnique({ where: { id: postId } });
      if (!post) throw new Error(`Post with id ${id} not found`);
      return post;
    },
  },

  Mutation: {
    // Create a new post
    createPost: async (_, { content }) => {
      return prisma.post.create({
        data: {
          title: content.title,
          description: content.description,
          status: content.status,
        },
      });
    },


    // Update an existing post
    // updatePost: async (_, { id, content }) => {
    //   const postId = parseInt(id);
    //   const post = await prisma.post.findUnique({ where: { id: postId } });
    //   if (!post) throw new Error(`Post with id ${postId} not found`);

    //   return prisma.post.update({
    //     where: { id: postId },
    //     data: {
    //       ...(content.title && { title: content.title }),
    //       ...(content.description && { description: content.description }),
    //       ...(content.status && { status: content.status }),
    //     },
    //   });
    // },

     updatePost: async (_, { id, content }) => {
      const postId = Number(id);
      const existing = await prisma.post.findUnique({ where: { id: postId } });
      if (!existing) throw new Error(`Post with id ${postId} not found`);

      return prisma.post.update({
        where: { id: postId },
        data: {
          ...(content.title && { title: content.title }),
          ...(content.description && { description: content.description }),
          ...(content.status !== undefined && { status: content.status }),
        },
      });
    },





    // Delete a post
    deletePost: async (_, { id }) => {
      const postId = parseInt(id);
      const post = await prisma.post.findUnique({ where: { id: postId } });
      if (!post) throw new Error(`Post with id ${postId} not found`);

      return prisma.post.delete({ where: { id: postId } });
    },
  },
};
