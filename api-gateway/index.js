const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const movieClient = require('./movieClient');
const userClient = require('./userClient');
const recommendationClient = require('./recommendationClient');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();
app.use(cors());

// ✅ Utiliser bodyParser uniquement pour les routes REST
app.use('/users', bodyParser.json());
app.use('/movies', bodyParser.json());
app.use('/recommendations', bodyParser.json());

// === REST routes ===

// Create User
app.post('/users', (req, res) => {
  userClient.CreateUser(req.body, (err, data) => {
    if (err) return res.status(500).send(err.message);
    res.json(data);
  });
});

// Get User
app.get('/users/:id', (req, res) => {
  userClient.GetUser({ id: req.params.id }, (err, data) => {
    if (err) return res.status(404).send(err.message);
    res.json(data);
  });
});

// Add Movie
app.post('/movies', (req, res) => {
  const { title, genre, director, year } = req.body;
  movieClient.AddMovie({ title, genre, director, year }, (err, response) => {
    if (err) {
      console.error('Erreur lors de l\'ajout du film:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(response);
  });
});

// Get Movie by ID
app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  movieClient.GetMovie({ id }, (err, response) => {
    if (err) {
      console.error('Erreur lors de la récupération du film:', err);
      return res.status(404).json({ error: 'Film introuvable' });
    }
    res.json(response);
  });
});

// Get All Movies
app.get('/movies', (req, res) => {
  movieClient.GetAllMovies({}, (err, response) => {
    if (err) {
      console.error('Erreur lors de la récupération des films:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(response);
  });
});

// Get Recommendations
app.get('/recommendations/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await new Promise((resolve, reject) => {
      recommendationClient.GetRecommendations({ userId }, (err, response) => {
        if (err) {
          console.error('gRPC error:', err);
          return reject(err.details || 'Failed to fetch recommendations');
        }
        resolve(response);
      });
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// === GraphQL Server ===
const server = new ApolloServer({ typeDefs, resolvers });
async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(3000, () => {
    console.log(`🚀 API Gateway running at http://localhost:3000`);
    console.log(`🔗 GraphQL available at http://localhost:3000${server.graphqlPath}`);
  });
}

startApolloServer();
