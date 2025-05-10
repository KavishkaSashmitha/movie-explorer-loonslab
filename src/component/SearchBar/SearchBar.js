import React, { useState, useEffect } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { useMovieContext } from '../../context/MovieContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { handleSearch, searchQuery, resetSearch } = useMovieContext();
  const [query, setQuery] = useState(searchQuery || '');
  const navigate = useNavigate();

  // Load last search query from local storage on mount
  useEffect(() => {
    const lastQuery = localStorage.getItem('lastSearchQuery');
    if (lastQuery && !query) {
      setQuery(lastQuery);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query);
      navigate('/');
    }
  };

  const clearSearch = () => {
    setQuery('');
    resetSearch();
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: { xs: '100%', sm: '400px' },
        maxWidth: '100%',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for movies..."
        inputProps={{ 'aria-label': 'search movies' }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {query && (
        <IconButton
          sx={{ p: '10px' }}
          aria-label="clear"
          onClick={clearSearch}
        >
          <Clear />
        </IconButton>
      )}
      
      <IconButton 
        type="submit" 
        sx={{ p: '10px' }} 
        aria-label="search"
      >
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;