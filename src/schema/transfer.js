// Dependencies
import {gql} from 'apollo-server-express';

export default gql` 
  type Transfer {
    from: String!
    to: String!
    quantity: Int!
    price: String!
    currency: String!
  }
`;
