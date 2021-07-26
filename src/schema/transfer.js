// Dependencies
import {gql} from 'apollo-server-express';

export default gql`
  enum TransferType {
    buy
    sell
    trade
    rent
  }
  
  type Transfer {
    type: TransferType!
    from: String!
    to: String!
    quantity: Int!
    price: String!
    currency: String!
  }
`;
