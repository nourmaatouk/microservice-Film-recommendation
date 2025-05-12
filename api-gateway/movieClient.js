const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const protoPath = path.join(__dirname, 'movie.proto'); // Assure-toi que ce fichier existe ici

const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const moviePackage = grpcObject.movie;

const client = new moviePackage.MovieService(
  '127.0.0.1:50052', // port du movie-service
  grpc.credentials.createInsecure()
);

module.exports = client;
