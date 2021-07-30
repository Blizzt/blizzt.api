// Dependencies
import {gql} from 'apollo-server-express';

export default gql`
  enum TransferType {
    buy
    sell
    trade
    rent
  }
  
  enum ActionStateType {
    active
    inactive
  }
  
  type Action {
    state: ActionStateType!
    type: TransferType!
    quantity: Int!
    price: String!
    currency: Currency!
    
    createdAt: Date
    
    nft: NFT
    project: Project
    user: User
  }
`;
