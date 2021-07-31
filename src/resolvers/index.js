// Dependencies
import {GraphQLDateTime} from 'graphql-iso-date';
import {GraphQLUpload} from 'apollo-server-express';

// Resolvers
import nftResolvers from './nft';
import userResolvers from './user';
import projectResolvers from './project';
import categoryResolvers from './category';
import transferResolvers from './transfer';
import offerResolvers from './offer';
import currencyResolvers from './currency';

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
  transferResolvers,
  offerResolvers,
  currencyResolvers,
];
