// Dependencies
import {gql} from 'apollo-server-express';

export default gql`
  enum OperationType {
    buy
    sell
    trade
    rent
  }
  
  type Operation {
    type: OperationType!
    from: String!
    to: String!
    quantity: Int!
    price: String!
    currency: String!
  }
`;
