# Echo Music Application

This project was made with React, Spotify API, and react-spotify-web-playback.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

This will display the spotify logo and login button.
When clicked, the button will redirect to a spotify login page to gain access, then redirect to app after.

### `Running Locally`
If you wish to run this application locally on your machine, follow these steps:

## `Environment Variables:`

You'll need a .env file in the root directory of the project.
Add the following line to the .env file:

REACT_APP_SPOTIFY_CLIENT_ID=<your_spotify_client_id_here>

Replace <your_spotify_client_id_here> with your actual Spotify client ID.

### `Built With`
React - A JavaScript library for building user interfaces. This project uses the latest version (v18.2.0) for more efficient updates and rendering.

React DOM - Serves as the entry point to the DOM and server renderers for React.

React Router DOM - Declarative routing for React (v6.17.0).

React Icons - Utilize ES6 imports to include only the icons your project is using.

React Spotify Web Playback - A Spotify web playback SDK component for React.

Axios - Promise-based HTTP client for making HTTP requests.

### `Scripts`
npm start: Runs the app in development mode.
npm test: Launches the test runner in the interactive watch mode.
npm build: Builds the app for production to the build folder.
