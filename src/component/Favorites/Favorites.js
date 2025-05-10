import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../../context/MovieContext';
import MovieGrid from '../MovieGrid/MovieGrid';
import { ArrowBack } from '@mui/icons-material';

const Favorites = () => {
  const { favorites } = useMovieContext();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button 
          startIcon={<ArrowBack />} 
          onClick={handleBackClick}
          sx={{ mr: 2 }}
        >
          Back to Home
        </Button>
        <Typography variant="h4" component="h1">
          My Favorite Movies
        </Typography>
      </Box>
      
      {favorites.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            You haven't added any favorite movies yet.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleBackClick}
            sx={{ mt: 2 }}
          >
            Explore Movies
          </Button>
        </Box>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </Container>
  );
};

export default Favorites;