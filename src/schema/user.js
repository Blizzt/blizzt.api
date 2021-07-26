// Dependencies
import {gql} from 'apollo-server-express';

export default gql`
  type UserInventory {
    amount: Int
    items: [NFT]
  } 
 
  type User {
    id: Int!
    address: String!
    username: String
    photoUrl: String
    role: String!
    
    projects: [Project!]
    inventory: UserInventory
  }
  
  type Token {
    token: String!
    user: User!
  }
    
  extend type Query {
    me: User
  }

  extend type Mutation {
    obtainUserFromWallet(
      wallet: String!
    ): Token!
  }
`;
