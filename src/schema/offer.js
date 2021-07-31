// Dependencies
import {gql} from 'apollo-server-express';

export default gql`
  ### Inputs ###
  input OfferInput {
    amount: Int!
    price: String!
    currency: Currency!
    until: Date
    isBundlePack: Boolean
  }
  
  # List the type of offer.
  enum OfferType {
    buy
    sell
    rent
    trade
  }
  
  # List the status of an offer (Active or Inactive)
  enum OfferState {
    active
    inactive
  }
  
  type Offer {
    id: Int!
    quantity: Int!
    price: String!
    createdAt: Date!
    type: OfferType!
    state: OfferState!
    currency: Currency!
    isBundlePack: Boolean
    maxExpirationDate: Date
    
    nft: NFT!
    user: User!
    project: Project!
  }

  extend type Query {
    offer: Offer
  }
`;
