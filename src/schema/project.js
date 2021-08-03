// Dependencies
import {gql} from 'apollo-server-express';

export default gql`
  type Project {
    id: ID!
    chainId: Int!
    collectionAddress: String
    title: String
    description: String
    isPublic: Boolean!
    photoUrl: String
    document: String!
    createdAt: Date!
        
    creator: User!
    category: Category!
    nfts: [NFT]
    nftsCount: Int!
    details: ProjectDetails
  }
  
  type ProjectDetails {
    web: String
    steam: String
    xbox: String
    playstation: String
    android: String
    ios: String
    kickstarter: String
    instagram: String
    youtube: String
    twitch: String
    twitter: String
    facebook: String
    vk: String
    discord: String
    reddit: String
    telegram: String
  }
  
  input ProjectDetailsInput {
    web: String
    steam: String
    xbox: String
    playstation: String
    android: String
    ios: String
    kickstarter: String
    instagram: String
    youtube: String
    twitch: String
    twitter: String
    facebook: String
    vk: String
    discord: String
    reddit: String
    telegram: String
  }
   
  input EditProjectInput {
    title: String
    description: String
    isPublic: Boolean
    photoUrl: String
    document: String
    categoryId: Int
    collectionAddress: String
    details: ProjectDetailsInput
  }
    
  extend type Query {
    project(id: ID!): Project!
    projects(order: Sort): [Project!]
  }

  extend type Mutation {
    createProject(
      title: String!
      description: String!
      categoryId: Int!
      photo: Upload!
      chainId: Int!
    ): Project!
    
    editProject(id: ID!, data: EditProjectInput!): Project!
   
  }
`;

