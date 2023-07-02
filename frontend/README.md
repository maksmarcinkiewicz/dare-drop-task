# Streamer Spotlight Application

This is a simple streamer spotlight application that allows users to add their favorite streamers and upvote or downvote them. It consists of a frontend built with React.js and a backend built with Node.js and Express.js. The backend stores the streamer data in a MongoDB, and the frontend fetches and displays the streamer information in real-time using websocket.

## Features

- Streamer Submission Form: Users can submit their favorite streamers by providing the streamer's name, streaming platform, and description.
- Streamer List: Displays a list of all submitted streamers along with their number of upvotes and downvotes. The list updates in real-time as new streamers are added and votes are cast.
- Streamer Record Page: Shows detailed information about a specific streamer, including their name, description, platform, and a static image.

## Technologies Used

- React.js 
- Node.js
- Express.js
- MongoDB
- WebSocket
- JSON Web Token


## Installation and Setup

1. Clone the repository from GitHub: `git clone https://github.com/maksmarcinkiewicz/dare-drop-task.git`
2. Navigate to the project directory: `cd dare-drop-task`
3. Install the dependencies for the frontend and backend:
   - Frontend: `cd frontend && npm install`
   - Backend: `cd server && npm install`
4. Set up the database of your choice and configure the connection settings in the backend.
5. Start the development servers:
   - Frontend: `cd frontend && npm start`
   - Backend: `cd server && npm run dev`
6. Access the application in your browser at `http://localhost:3000`.

## Backend API Endpoints

- `POST /streamers`: Receives new streamer submissions from the frontend and stores them in the database.
- `GET /streamers`: Returns all stored streamer submissions in response to a request from the frontend.
- `GET /streamers/[streamerId]`: Returns data about a specific streamer.
- `PUT /streamers/[streamerId]/vote`: Receives an upvote for a specific streamer and updates their current upvote/downvote count.

## Code Structure

The project is structured into two main directories:

- `frontend`: Contains the frontend code built with React.js.
- `server`: Contains the backend code built with Node.js and Express.js.

Feel free to explore the codebase to understand the implementation details of each component and endpoint.

