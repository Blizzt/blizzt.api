// Dependencies
import {gql} from 'apollo-server-express';

// Schemas
import nftSchema from './nft';
import userSchema from './user';
import projectSchema from './project';
import categorySchema from './category';

const linkSchema = gql`
  scalar Date
  
  enum Sort {
    ASC
    DESC
  }
  
  enum Currency {
    BLZT
    DAI
    ETH
    USDT
  }
  
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
  	_: Boolean
  }

  type Mutation {
  	_: Boolean
  }

  type Subscription {
  	_: Boolean
  }
`;

export default [
  nftSchema,
  linkSchema,
  userSchema,
  projectSchema,
  categorySchema
];
