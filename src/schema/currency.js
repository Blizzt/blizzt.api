// Dependencies
import {gql} from 'apollo-server-express';

export default gql`
  type Fiat {
    usd: String
    eur: String
    aed: String
    cny: String
    jpy: String
    rub: String
    gbp: String
  }
  
  type Currency {
    id: String!
    name: String!
    symbol: String!
    image: String!
    
    usd: String
    eur: String
    aed: String
    cny: String
    jpy: String
    rub: String
    gbp: String
  }

  extend type Query {
    currency(id: String!): Currency
    currencies: [Currency]
  }
`;
