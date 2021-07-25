// Dependencies
import {gql} from 'apollo-server-express';

export default gql`
  enum NFTType {
    object
    chrome
  }

  type NFT {
    id: Int!
    type: NFTType!
    nftId: Int!
    IPFSAddress: String!
    metadata: String!
    amount: Int!
    
    forRent: [Operation]
    forSale: [Operation]
    
    creator: User
    project: Project
  }
     
  extend type Query {
    nft(projectId: ID!, nftId: Int!): NFT!
    nfts: [NFT!]
  }
  
  extend type Mutation {
    mintNFT(
      projectId: ID!
      type: NFTType
      nftId: Int!
      collectionAddress: String!
      metadata: String!
      IPFSAddress: String!
      amount: Int!
    ): NFT!
    
    sellNFT(
      id: Int!
      projectId: ID!
      amount: Int!
      price: String!
      isBundlePack: Boolean!
      currency: Currency!
    ): NFT!
    
    buyNFT(
      id: Int!
      projectId: ID!
      amount: Int!
      price: String!
      currency: Currency!
    ): NFT!
        
    rentNFT(
      id: Int!
      projectId: ID!
      amount: Int!
      price: String!
      currency: Currency!
      maxExpirationDate: Date!
    ): NFT!
  }
`;
