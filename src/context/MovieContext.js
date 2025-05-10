import React, { createContext, useState, useEffect, useContext } from 'react';
import { getTrendingMovies, searchMovies } from '../services/api';

// Create context
const MovieContext = createContext();

// Custom hook to use the movie context
export const useMovieContext = () => useContext(MovieContext);

// Provider component
export const MovieProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  // Load trending movies on component mount
  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        setLoading(true);
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
      } catch (err) {
        setError('Failed to load trending movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTrendingMovies();
  }, []);

  // Save favorites to local storage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save dark mode preference to local storage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Save user info to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Save last search query to local storage
  useEffect(() => {
    if (searchQuery) {
      localStorage.setItem('lastSearchQuery', searchQuery);
    }
  }, [searchQuery]);

  // Handle search
  const handleSearch = async (query, page = 1) => {
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      setSearchQuery(query);
      const data = await searchMovies(query, page);
      
      if (page === 1) {
        setSearchResults(data.results);
      } else {
        setSearchResults(prev => [...prev, ...data.results]);
      }
      
      setTotalPages(data.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to search movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load more search results
  const loadMoreResults = () => {
    if (currentPage < totalPages) {
      handleSearch(searchQuery, currentPage + 1);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Add to favorites
  const addToFavorites = (movie) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === movie.id);
    
    if (!isAlreadyFavorite) {
      setFavorites(prev => [...prev, movie]);
    }
  };

  // Remove from favorites
  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId));
  };

  // Login user
  const login = (userData) => {
    setUser(userData);
  };

  // Logout user
  const logout = () => {
    setUser(null);
  };

  // Reset search results
  const resetSearch = () => {
    setSearchResults([]);
    setSearchQuery('');
    setCurrentPage(1);
    setTotalPages(0);
  };

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        searchResults,
        searchQuery,
        loading,
        error,
        darkMode,
        favorites,
        currentPage,
        totalPages,
        user,
        handleSearch,
        loadMoreResults,
        toggleDarkMode,
        addToFavorites,
        removeFromFavorites,
        login,
        logout,
        resetSearch
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;