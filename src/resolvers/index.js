// Dependencies
import {GraphQLDateTime} from 'graphql-iso-date';
import {GraphQLUpload} from 'apollo-server-express';

// Resolvers
import nftResolvers from './nft';
import userResolvers from './user';
import projectResolvers from './project';
import categoryResolvers from './category';
import operationResolvers from './operation';

const customScalarResolver = {
  Date: GraphQLDateTime,
  Upload: GraphQLUpload,
};

export default [
  customScalarResolver,
  nftResolvers,
  userResolvers,
  projectResolvers,
  categoryResolvers,
  operationResolvers
];