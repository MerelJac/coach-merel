# Fitness Dashboard Application

This is a fitness dashboard application built using React for the frontend, an Express server for the backend, and MongoDB as the database. This application allows users to log in, track their fitness workouts, and view workout statistics.

## Features

- **User Authentication:** Users can create an account or log in using their email and password. Authentication is implemented using JSON Web Tokens (JWT).

- **Dashboard:** Upon successful login, users are greeted with a personalized dashboard displaying their name and options to create a new workout or view workout statistics.

- **Workout Tracking:** Users can create new workout entries with details such as exercise type, duration, and date.

- **Statistics:** The application provides statistics and insights based on users' workout data, helping them track their progress over time.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.

- **Express:** A web application framework for Node.js used for building the server-side logic.

- **MongoDB:** A NoSQL database used for storing user data and workout records.

- **JSON Web Tokens (JWT):** Used for secure user authentication and authorization.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository to your local machine.

2. Install dependencies for both the client (React) and server (Express) using the package manager of your choice (e.g., npm or yarn).

3. Set up a MongoDB database and configure the connection in the server code.

4. Create a `.env` file in the server directory and add your JWT secret key and other environment variables.

5. Start the server by running the appropriate script (e.g., `npm start` or `yarn start`) in the server directory.

6. Start the client by running the appropriate script (e.g., `npm start` or `yarn start`) in the client directory.

7. Open your web browser and navigate to `http://localhost:3000` to access the application.

