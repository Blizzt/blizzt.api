// Dependencies
import {gql} from 'apollo-server-express';

export default gql`
  type User {
    id: Int!
    address: String!
    username: String
    photoUrl: String
    role: String!
    
    projects: [Project!]
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
