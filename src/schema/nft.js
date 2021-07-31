// Dependencies
import {gql} from 'apollo-server-express';

export default gql`
  # Enumerator by object types.
  enum NFTType {
    object
    chrome
  }
  
  # Object of Offers
  type Offers {
    forRent: Offer
    forSale: Offer
  }

  type NFT {
    nftId: Int!
    type: NFTType!
    metadata: String!
    mintedAmount: Int!
    IPFSAddress: String!
    
    ## Authentication ##
    acquired: Int!
    
    ## Offers ##
    forRent: [Offer]
    forSale: [Offer]
    latestOffers: Offers
    
    ## Details ##
    project: Project
  }
     
  extend type Query {
  
    # Obtain data from a specific NFT.
    nft(projectId: ID!, nftId: Int!): NFT!
    
    # List all existing NFTs.
    nfts: [NFT!]
  }
  
  extend type Mutation {
    # Function that is responsible for mint NFT.
    mintNFT(
      nftId: Int!
      amount: Int!
      type: NFTType
      projectId: ID!
      metadata: String!
      IPFSAddress: String!
      collectionAddress: String!
    ): NFT!
    
    # Responsible for adding a sale offer.
    putOnSaleNFT(
      nftId: Int!
      projectId: ID!
      offer: OfferInput!      
      signature: UserSignatureInput!
    ): Offer!
    
    # Responsible for adding a rent offer.
    putOnRentNFT(
      nftId: Int!
      projectId: ID!
      offer: OfferInput!
      signature: UserSignatureInput!
    ): Offer!
    
    # Responsible for executing purchase of offer.
    buyNFT(offerId: Int!, amount: Int!): Offer!

    # Responsible for executing renting of offer.
    rentNFT(offerId: Int!, amount: Int!, until: Date!): Offer!
  }
`;
