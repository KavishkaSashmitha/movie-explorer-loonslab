import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { useMovieContext } from '../../context/MovieContext';
import TrendingMovies from '../TrendingMovies/TrendingMovies';
import MovieGrid from '../MovieGrid/MovieGrid';

const Home = () => {
  const { searchResults, searchQuery } = useMovieContext();

  return (
    <Container maxWidth="xl">
      {searchQuery ? (
        <Box sx={{ py: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Search Results for "{searchQuery}"
          </Typography>
          <MovieGrid 
            movies={searchResults} 
            isSearchResults={true} 
          />
        </Box>
      ) : (
        <TrendingMovies />
      )}
    </Container>
  );
};

export default Home;