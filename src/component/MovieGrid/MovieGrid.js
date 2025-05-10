import React, { useEffect, useRef, useCallback } from 'react';
import { Grid, Typography, Box, Button, CircularProgress } from '@mui/material';
import MovieCard from '../MovieCard/MovieCard';
import { useMovieContext } from '../../context/MovieContext';

const MovieGrid = ({ movies, title, isSearchResults = false }) => {
  const { loading, loadMoreResults, currentPage, totalPages } = useMovieContext();
  const observer = useRef();

  // Setup infinite scroll with Intersection Observer
  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages && isSearchResults) {
          loadMoreResults();
        }
      });
      
      if (node) observer.current.observe(node);
    },
    [loading, currentPage, totalPages, loadMoreResults, isSearchResults]
  );

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  if (!movies || movies.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          {isSearchResults 
            ? 'No movies found matching your search.' 
            : 'No movies available.'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      {title && (
        <Typography variant="h4" component="h2" gutterBottom>
          {title}
        </Typography>
      )}
      
      <Grid container spacing={3}>
        {movies.map((movie, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            key={`${movie.id}-${index}`}
            ref={index === movies.length - 1 ? lastMovieElementRef : null}
          >
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {isSearchResults && currentPage < totalPages && !loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            onClick={loadMoreResults}
            disabled={loading}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MovieGrid;