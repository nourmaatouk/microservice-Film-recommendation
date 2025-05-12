# Movie Recommendation Microservices System

## Overview
This project is a microservices-based movie recommendation system that consists of multiple independent services working together to provide a complete movie recommendation experience. The system is built using Spring Boot and follows microservices architecture principles.

## System Architecture

### Services
The system consists of the following microservices:

1. **Movie Service**
   - Manages movie-related operations
   - Handles movie data storage and retrieval
   - Provides movie information and details

2. **User Service**
   - Manages user-related operations
   - Handles user authentication and authorization
   - Stores user preferences and profiles

3. **Recommendation Service**
   - Generates personalized movie recommendations
   - Processes user preferences and viewing history
   - Implements recommendation algorithms

4. **API Gateway**
   - Acts as a single entry point for all client requests
   - Handles routing and load balancing
   - Implements cross-cutting concerns like authentication

### Technology Stack
- **Backend Framework**: Spring Boot
- **Message Broker**: Apache Kafka
- **Service Discovery**: (To be implemented)
- **Container Orchestration**: Docker
- **Database**: (To be configured per service)

## Prerequisites
- Java JDK 17 or higher
- Docker and Docker Compose
- Maven
- Apache Kafka
- (Additional dependencies as needed)

## Getting Started

### 1. Clone the Repository
```bash
git clone [repository-url]
cd [project-directory]
```

### 2. Build the Services
```bash
# Build all services
mvn clean install

# Build individual services
cd movie-service
mvn clean install
```

### 3. Run with Docker Compose
```bash
# Start all services
docker-compose up -d
```

### 4. Access the Services
- API Gateway: http://localhost:8080
- Movie Service: http://localhost:8081
- User Service: http://localhost:8082
- Recommendation Service: http://localhost:8083

## Service Details

### Movie Service
- Port: 8081
- Responsibilities:
  - Movie CRUD operations
  - Movie metadata management
  - Movie search functionality

### User Service
- Port: 8082
- Responsibilities:
  - User registration and authentication
  - Profile management
  - User preferences storage

### Recommendation Service
- Port: 8083
- Responsibilities:
  - Movie recommendation generation
  - User preference analysis
  - Recommendation algorithm implementation

### API Gateway
- Port: 8080
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
mvn test

# Run tests for specific service
cd movie-service
mvn test
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
- (Additional monitoring tools to be implemented)

## Security
- JWT-based authentication
- HTTPS encryption
- Input validation
- Rate limiting
- (Additional security measures to be implemented)

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
[Specify your license here]

## Contact
[Your contact information] 