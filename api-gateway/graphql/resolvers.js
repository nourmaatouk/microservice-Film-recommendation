const movieClient = require('../movieClient');
const userClient = require('../userClient');
const recommendationClient = require('../recommendationClient');

const resolvers = {
  Query: {
    getAllMovies: async () => {
      return new Promise((resolve, reject) => {
        movieClient.GetAllMovies({}, (err, response) => {
          if (err) return reject(err);
          resolve(response.movies);
        });
      });
    },

    getMovie: async (_, { id }) => {
      return new Promise((resolve, reject) => {
        movieClient.GetMovie({ id }, (err, response) => {
          if (err) return reject(err);
          resolve(response);
        });
      });
    },

    getUser: async (_, { id }) => {
      return new Promise((resolve, reject) => {
        userClient.GetUser({ id }, (err, response) => {
          if (err) return reject(err);
          resolve(response);
        });
      });
    },

    getRecommendations: async (_, { userId }) => {
      return new Promise((resolve, reject) => {
        recommendationClient.GetRecommendations({ userId }, (err, response) => {
          if (err) return reject(err);
          resolve(response.movies);
        });
      });
    }
  },

  Mutation: {
    addMovie: async (_, { title, genre, director, year }) => {
      return new Promise((resolve, reject) => {
        movieClient.AddMovie({ title, genre, director, year }, (err, response) => {
          if (err) return reject(err);
          resolve(response);
        });
      });
    },

    createUser: async (_, { name, preferences }) => {
      return new Promise((resolve, reject) => {
        userClient.CreateUser({ name, preferences }, (err, response) => {
          if (err) return reject(err);
          resolve(response);
        });
      });
    }
  }
};

module.exports = resolvers;
