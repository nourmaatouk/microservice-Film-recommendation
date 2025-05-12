const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const movieClient = require('./movieClient'); // Assuming movieClient is correctly set up
const userClient = require('./userClient'); // Assuming userClient is correctly set up

// Load the recommendation.proto
const protoPath = path.join(__dirname, 'recommendation.proto');
const packageDef = protoLoader.loadSync(protoPath, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const recommendationPackage = grpcObject.recommendation;

// Implement the Recommendation Service
const recommendationService = {
  GetRecommendations: (call, callback) => {
    const { userId } = call.request;
    if (!userId) {
      console.error('No userId provided');
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: "userId is required"
      });
    }

    console.log(`Fetching recommendations for user: ${userId}`);

    // Fetch the user's preferences from the UserService
    userClient.GetUser({ id: userId }, (err, userResponse) => {
      if (err) {
        console.error('Error fetching user:', err);
        return callback({
          code: grpc.status.NOT_FOUND,
          details: "User not found"
        });
      }

      // Extract the preferences (e.g., genres) from the user data
      const userPreferences = userResponse.preferences || [];
      console.log(`User preferences: ${userPreferences}`);

      // Fetch all movies from the MovieService
      movieClient.GetAllMovies({}, (movieErr, MovieList) => {
        if (movieErr) {
          console.error('Error fetching movies:', movieErr);
          return callback({
            code: grpc.status.INTERNAL,
            details: "Error fetching movies"
          });
        }

        // Log the movies fetched
        console.log('All movies:', MovieList.movies);

        // Filter movies based on user preferences (e.g., genres)
        const recommendedMovies = MovieList.movies.filter(movie =>
          userPreferences.includes(movie.genre) // Filter by genres the user likes
        );

        // Return the recommended movies
        callback(null, { movies: recommendedMovies });
      });
    });
  }
};

// Create and start gRPC server
const server = new grpc.Server();
server.addService(recommendationPackage.RecommendationService.service, recommendationService);

server.bindAsync('0.0.0.0:50053', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Recommendation Service running on port 50053');
  server.start();
});
