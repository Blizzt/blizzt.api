// Dependencies
import {gql} from 'apollo-server-express';

export default gql`
  enum CategoryType {
    game
    song
    movie
    software
  }

  type Category {
    id: Int!
    name: String!
    type: CategoryType!
  }
     
  extend type Query {
    category(id: Int!): Category!
    categories: [Category!]
  }
`;
