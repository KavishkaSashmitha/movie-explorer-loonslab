import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useMovieContext } from '../../context/MovieContext';

const TrendingMovies = () => {
  const { trendingMovies, loading, error } = useMovieContext();

  if (loading && trendingMovies.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <MovieGrid 
      movies={trendingMovies} 
      title="Trending Movies This Week" 
    />
  );
};

export default TrendingMovies;