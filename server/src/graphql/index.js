import { postResolvers } from "./resolvers/postResolvers.js";
import { postTypeDefs } from "./typeDefs/postTypeDefs.js";



export const typeDefs = [postTypeDefs];
// export const typeDefs = [userTypeDefs, postTypeDefs, commentTypeDefs];

export const resolvers = {
  Query: {
    // ...userResolvers.Query,
    ...postResolvers.Query,
    // ...commentResolvers.Query,
  },
  Mutation: {
    // ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    // ...commentResolvers.Mutation,
  },
};