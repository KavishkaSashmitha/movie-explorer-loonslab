# Movie Explorer

Movie Explorer is a React-based web application that allows users to explore trending movies, search for specific movies, view detailed information, and manage their favorite movies. The app also supports user login and dark mode.

## Features

- **Trending Movies**: View a list of trending movies.
- **Search**: Search for movies by title.
- **Movie Details**: View detailed information about a selected movie.
- **Favorites**: Add or remove movies from your favorites list.
- **Dark Mode**: Toggle between light and dark themes.
- **User Authentication**: Login and logout functionality.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd movie-explorer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Open the app in your browser at `http://localhost:3000`.
2. Browse trending movies or use the search bar to find specific movies.
3. Click on a movie to view its details.
4. Add movies to your favorites list by clicking the heart icon.
5. Toggle dark mode using the dark mode switch.
6. Login to save your preferences and favorites.

## Folder Structure

```
movie-explorer/
├── public/
├── src/
│   ├── component/
│   │   ├── Favorites/
│   │   ├── Header/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── MovieCard/
│   │   ├── MovieDetails/
│   │   ├── MovieGrid/
│   │   ├── SearchBar/
│   │   ├── TrendingMovies/
│   ├── context/
│   │   ├── MovieContext.js
│   ├── services/
│   │   ├── api.js
│   ├── App.js
│   ├── index.js
```

## Movie Context Explanation

The `MovieContext` is a React Context API implementation that manages the global state of the application. It provides the following functionalities:

- **Trending Movies**: Fetches and stores trending movies.
- **Search**: Handles search queries and stores search results.
- **Favorites**: Manages the list of favorite movies.
- **Dark Mode**: Toggles and persists the dark mode preference.
- **User Authentication**: Stores user information and handles login/logout.

### Key Methods in `MovieContext`

- `handleSearch(query, page)`: Searches for movies based on the query and page number.
- `addToFavorites(movie)`: Adds a movie to the favorites list.
- `removeFromFavorites(movieId)`: Removes a movie from the favorites list.
- `toggleDarkMode()`: Toggles the dark mode.
- `login(userData)`: Logs in a user and stores their information.
- `logout()`: Logs out the user and clears their information.

## User Login Validations

The app includes basic user login validations:

- **Login**: The `login` method in `MovieContext` accepts user data and stores it in the context and local storage.
- **Logout**: The `logout` method clears the user data from the context and local storage.
- **Protected Routes**: Certain routes can be protected using a `ProtectedRoute` component to ensure only logged-in users can access them.

## License

This project is licensed under the MIT License.
