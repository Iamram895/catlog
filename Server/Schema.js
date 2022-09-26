const { gql } = require("apollo-server");

const typeDefs = gql`

type Track {
  id: ID!
  titles: String!
  author: Author!
  thumbnail: String
  lengths: Int
  modulesCount: Int
description: String
numberOfView: Int
modules: [Module!]!
}

type Author {
  id: ID!
  name: String!
  photo: String
}

type Module {
  id: ID!
  "The Module's title"
  title: String!
  length: Int
}

type Query {
    "Get tracks array for homepage grid"

    tracksForHome: [Track!]!

    "Fetch a specific track, provided a track's ID"
    
track(id: ID!): Track
  }

  type Mutation {
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse! # highlight-line
  }
  type IncrementTrackViewsResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    track: Track
  }

`;

module.exports = typeDefs;

