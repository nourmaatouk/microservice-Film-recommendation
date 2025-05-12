const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the .proto file
const protoPath = path.join(__dirname, 'recommendation.proto');

// Load the package definition with specific options
const packageDef = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// Load the gRPC object from the package definition
const grpcObject = grpc.loadPackageDefinition(packageDef);

// Ensure the package and service are correctly referenced
const recommendationPackage = grpcObject.recommendation; // This matches the package name in your proto file

// Create the gRPC client
const clientRecommendation = new recommendationPackage.RecommendationService(
  '127.0.0.1:50053', // Make sure the server is running on this port
  grpc.credentials.createInsecure()
);

// Export the client so it can be used in other parts of your application
module.exports = clientRecommendation;
