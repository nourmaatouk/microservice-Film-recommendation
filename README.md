# Movie Recommendation Microservices System

## Overview
This project is a microservices-based movie recommendation system built using Node.js, following clean architecture and service separation. It includes multiple independent services that communicate via gRPC and Apache Kafka, while exposing APIs through a central API Gateway using REST and GraphQL.


## System Architecture

### Services
The system consists of the following microservices:

1. **Movie Service**
   - Manages movie creation and retrieval
   - Stores data in MongoDB
   - Publishes events to Kafka

2. **User Service**
   - Handles user registration and management
   - Communicates via gRPC

3. **Recommendation Service**
   - Listens to Kafka events
   - Generates and serves movie recommendations based on user and movie data

4. **API Gateway**
   - Serves as the single entry point
   - Exposes REST and GraphQL APIs
   - Routes requests to gRPC-based services

### Technology Stack
- **Backend Framework**: Node.js (Express, Apollo)
- **Message Broker**: Apache Kafka
- **Communication**: gRPC, Kafka
- **Container Orchestration**: Docker, Docker Compose
- **Database**: MongoDB

## Prerequisites
- Node.js v18+
- Docker and Docker Compose
- MongoDB 
- Apache Kafka

## Getting Started

### 1. Clone the Repository
```bash
git clone [repository-url]
cd [project-directory]
```

### 2. Build the Services
```bash
# Clone the Repository
git clone https://github.com/your-username/movie-recommendation-system.git
cd movie-recommendation-system

# Install Dependencies
cd movie-service && npm install
cd ../user-service && npm install
cd ../recommendation-service && npm install
cd ../api-gateway && npm install
```

### 3. Run with Docker Compose
```bash
# Start all services
docker-compose up --build
```

### 4. Access the Services
- API Gateway: http://localhost:3000
- Movie Service: http://localhost:	50052
- User Service: http://localhost:50051
- Recommendation Service: http://localhost:50053

## Service Details

### Movie Service
- Port: 50052
- Responsibilities:
  - Movie CRUD operations
  - Movie metadata management
  - Movie search functionality

### User Service
- Port: 50051
- Responsibilities:
  - User registration and authentication
  - Profile management
  - User preferences storage

### Recommendation Service
- Port: 50053
- Responsibilities:
  - Movie recommendation generation
  - User preference analysis
  - Recommendation algorithm implementation

### API Gateway
- Port: 3000
- Responsibilities:
  - Request routing
  - Load balancing
  - Authentication and authorization
  - API documentation

## Development

### Project Structure
```
├── movie-service/
├── user-service/
├── recommendation-service/
└── api-gateway/
```

### Adding New Features
1. Create feature branch
2. Implement changes
3. Write tests
4. Create pull request
5. Code review
6. Merge to main branch

## Testing
```bash
# Run tests for all services
npm test

# Run tests for specific service
cd movie-service
npm test
```

## Deployment
The system is containerized using Docker and can be deployed using Docker Compose or Kubernetes.

### Docker Deployment
```bash
# Build and start all services
docker-compose up --build

# Stop all services
docker-compose down
```

## Monitoring and Logging
- Application logs are available through Docker logs
- Each service implements its own logging mechanism

## Future Improvements
- Add authentication service (JWT)
- Implement service discovery (Consul or Kubernetes)
- Add Prometheus/Grafana monitoring
- Improve recommendation logic with ML

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

