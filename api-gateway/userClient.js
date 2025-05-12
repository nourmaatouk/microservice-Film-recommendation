const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Chargement du .proto
const protoPath = path.join(__dirname, 'user.proto');
const packageDef = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const grpcObject = grpc.loadPackageDefinition(packageDef);
const userPackage = grpcObject.user; // doit correspondre à "package user" dans le .proto

// Création du client gRPC
const client = new userPackage.UserService(
  '127.0.0.1:50051', // utilise IPv4 ici
  grpc.credentials.createInsecure()
);

module.exports = client;
