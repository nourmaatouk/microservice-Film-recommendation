const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const path = require('path');
const { connectKafka, publishEvent } = require('./kafka'); // Kafka intégré

const PROTO_PATH = path.join(__dirname, 'movie.proto');
const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const moviePackage = grpcObject.movie;

const Movie = require('./models/movie');

// Implémentation des méthodes gRPC
const movieService = {
  GetMovie: async (call, callback) => {
    try {
      const movie = await Movie.findById(call.request.id);
      if (movie) {
        callback(null, movie);
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: 'Movie not found'
        });
      }
    } catch (err) {
      callback(err);
    }
  },

  AddMovie: async (call, callback) => {
    try {
      const movie = new Movie(call.request);
      await movie.save();

      // Publier un événement Kafka après ajout
      await publishEvent('movie-created', {
        id: movie._id.toString(),
        title: movie.title,
        genre: movie.genre,
        director: movie.director,
        year: movie.year
      });

      callback(null, movie);
    } catch (err) {
      callback(err);
    }
  },

  GetAllMovies: async (call, callback) => {
    try {
      const movies = await Movie.find();
      callback(null, { movies });
    } catch (err) {
      console.error('Erreur lors de la récupération des films:', err);
      callback(err);
    }
  }
};

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/movie-service', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    // Connecter Kafka une fois MongoDB prêt
    return connectKafka();
  })
  .then(() => {
    // Démarrage du serveur gRPC
    const server = new grpc.Server();
    server.addService(moviePackage.MovieService.service, movieService);

    server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
      console.log('✅ gRPC Movie Service started on port 50052');
      server.start();
    });
  })
  .catch(err => {
    console.error('Startup error:', err);
  });
