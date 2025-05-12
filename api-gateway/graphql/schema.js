const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    genre: String!
    director: String
    year: Int
  }

  type User {
    id: ID!
    name: String!
    preferences: [String!]!
  }

  type Query {
    getAllMovies: [Movie!]!
    getMovie(id: ID!): Movie
    getUser(id: ID!): User
    getRecommendations(userId: ID!): [Movie!]!
  }

  type Mutation {
    addMovie(title: String!, genre: String!, director: String, year: Int): Movie!
    createUser(name: String!, preferences: [String!]!): User!
  }
`;

module.exports = typeDefs;
