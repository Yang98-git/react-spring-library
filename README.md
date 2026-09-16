# React Library Management System

A full-stack online library platform built with React and Spring Boot. The application allows users to discover books, check out available titles, manage their loans, write reviews, and communicate with library administrators.

This project demonstrates a production-style separation between a TypeScript frontend, a RESTful Java backend, a relational database, and an external identity provider.

## Why this project

The goal was to build more than a CRUD demo: the system models a realistic library workflow with authenticated users, role-based administration, checkout state, review pagination, borrowing history, and protected API endpoints.

## Key features

- Browse a paginated catalog of books
- Search books by title and category
- View book details, availability, reviews, and average ratings
- Authenticate and register through Keycloak
- Check out books and track active loans
- Return books and view borrowing history
- Submit reviews for checked-out books
- Ask questions and view administrator responses
- Provide an admin-only message management workflow
- Protect backend APIs with stateless JWT authentication
- Convert Keycloak realm roles into Spring Security authorities
- Validate request data and expose consistent REST endpoints

## Technology stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Keycloak JavaScript adapter
- Fetch API for backend communication
- CSS and Bootstrap assets for responsive UI styling
- Oxlint for linting

### Backend

- Java 21
- Spring Boot 4
- Spring Web MVC
- Spring Data JPA / Hibernate
- Spring Security
- OAuth 2.0 Resource Server with JWT
- Jakarta Bean Validation
- Spring Boot Actuator
- Maven

### Data and infrastructure

- MySQL
- Keycloak
- REST API
- Stateless authentication with bearer tokens

## Architecture

```text
React + TypeScript
        |
        | REST / JSON + JWT
        v
Spring Boot REST API
        |
        +--> Spring Security / Keycloak JWT validation
        +--> Service layer
        +--> JPA repositories
        v
      MySQL
```

The frontend keeps authentication concerns in a reusable `AuthContext` and sends bearer tokens through a shared authenticated-fetch utility. The backend is organized into controllers, services, repositories, entities, request models, and response models.

## Repository structure

```text
.
├── react/
│   └── react-library/       # React + TypeScript frontend
└── spring-boot-library/     # Spring Boot REST backend
```

## Local setup

### Prerequisites

- Node.js and npm
- Java 21
- MySQL
- Maven (or the included Maven Wrapper)
- Keycloak

### 1. Configure the backend

Create or update `spring-boot-library/src/main/resources/application.properties` for your local environment:

```properties
spring.datasource.url=jdbc:mysql://localhost:3307/reactlibrarydatabase
spring.datasource.username=<your-database-user>
spring.datasource.password=<your-database-password>

cors.allowedOrigin=http://localhost:5173

spring.security.oauth2.resourceserver.jwt.issuer-uri=http://localhost:8081/realms/LibraryKeycloak
spring.security.oauth2.resourceserver.jwt.jwk-set-uri=${spring.security.oauth2.resourceserver.jwt.issuer-uri}/protocol/openid-connect/certs
```

Create a MySQL database named `reactlibrarydatabase`, then start Keycloak on port `8081` with a realm named `LibraryKeycloak`. Configure the frontend client as `public-client` and create the roles required by the application, including `admin` for administrator access.

Do not commit real passwords, tokens, or other environment-specific credentials.

### 2. Start the backend

```bash
cd spring-boot-library
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

The API is available at `http://localhost:8080`.

### 3. Configure and start the frontend

Create `react/react-library/.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Then run:

```bash
cd react/react-library
npm install
npm run dev
```

The frontend is available at `http://localhost:5173`.

### 4. Useful frontend commands

```bash
npm run build
npm run lint
npm run preview
```

## API overview

| Area | Base path | Purpose |
| --- | --- | --- |
| Books | `/api/books` | Catalog, title/category search, and book details |
| Checkout | `/api/checkouts` | Borrowing books and checking availability |
| Shelf | `/api/shelf` | Current loans, returns, and borrowing history |
| Reviews | `/api/reviews` | Book reviews and average ratings |
| Messages | `/api/messages` | User questions and administrator responses |
| Protected profile | `/api/protected` | Authenticated-user access example |

Public read operations are available for book and review data. Checkout, shelf, review submission, and messaging operations require authentication. Administrator message operations require the `admin` role.

## Security highlights

- Keycloak handles login and registration
- The frontend uses the Authorization Code flow with PKCE
- Spring Security validates Keycloak-issued JWTs
- The backend is stateless and does not rely on server sessions
- Realm roles are mapped to Spring Security authorities
- CORS is restricted to the configured frontend origin
- Protected routes are enforced in both the frontend and backend
- Database credentials remain local and are excluded from Git

## Interview discussion points

This project is a good example of:

1. Designing a full-stack feature across UI, REST endpoints, services, persistence, and authentication.
2. Separating controller, service, repository, entity, request, and response responsibilities.
3. Implementing OAuth2/JWT security with Keycloak and role-based authorization.
4. Handling stateful business workflows such as checkout, return, and borrowing history.
5. Building reusable React authentication and API-request utilities.
6. Using pagination for catalog and review data instead of loading unbounded results.
7. Managing frontend and backend configuration separately for local development.

## Future improvements

- Add Docker Compose for MySQL and Keycloak
- Move all backend configuration to environment variables or a secrets manager
- Add integration tests for checkout, authorization, and review workflows
- Add automated CI for frontend lint/build and backend tests
- Add API documentation with OpenAPI/Swagger

