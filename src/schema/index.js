// Dependencies
import {gql} from 'apollo-server-express';

// Schemas
import nftSchema from './nft';
import userSchema from './user';
import projectSchema from './project';
import categorySchema from './category';
import transferSchema from './transfer';
import offerSchema from './offer';
import currencySchema from './currency';

const linkSchema = gql`
  scalar Date
  
  # List the type of order the lists can have.
  enum Sort {
    ASC
    DESC
  }
    
  # Defines the type of structuring for the files.
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
  categorySchema,
  offerSchema,
  transferSchema,
  currencySchema,
];
