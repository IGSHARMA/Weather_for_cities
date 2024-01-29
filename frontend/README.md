# ClearSky Forecast

ClearSky Forecast is a weather application that provides real-time temperature data for various cities. The application is split into a frontend React app and a backend NestJS service.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

**Backend Setup:**

1. Navigate to the backend directory and install the dependencies:

    ```bash
    cd path/to/backend
    npm install
    ```

    This will install all necessary packages for the backend service.

2. Start the backend service:

    ```bash
    npm start
    ```

    The backend service should now be running on `http://localhost:4000`.

**Frontend Setup:**

1. Open a new terminal, navigate to the frontend directory, and install the dependencies:

    ```bash
    cd path/to/frontend
    npm install
    ```

    This will install all necessary packages for the frontend application.

2. Start the frontend application:

    ```bash
    npm start
    ```

    The frontend application should now be running and accessible at `http://localhost:3000`.

### Special Libraries or Packages

The application uses several libraries and packages:

- **Frontend:**
  - `react-autocomplete` for the autocomplete feature in the search input.
  - `axios` for making HTTP requests to the backend service.
  - `react-scripts` for the React application setup and development server.

- **Backend:**
  - `@nestjs/axios` for performing HTTP requests to external weather APIs.
  - `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express` for the core NestJS framework and express platform.
  - `rxjs` for handling asynchronous data streams.

Ensure to install any additional libraries or packages as needed, depending on the final implementation of the project.

## Built With

- [React](https://reactjs.org/) - The frontend framework used.
- [NestJS](https://nestjs.com/) - The backend framework used.

## Authors

-Pratinav Sharma
