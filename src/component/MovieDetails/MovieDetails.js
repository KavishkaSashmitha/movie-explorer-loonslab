import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Chip, 
  Rating, 
  Paper, 
  Button, 
  CircularProgress, 
  IconButton, 
  Divider, 
  Stack
} from '@mui/material';
import { 
  Favorite, 
  FavoriteBorder, 
  OpenInNew, 
  ArrowBack
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, IMAGE_BASE_URL } from '../../services/api';
import { useMovieContext } from '../../context/MovieContext';
import noImage from '../../assets/no-image.png';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites } = useMovieContext();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const isFavorite = favorites.some(fav => fav.id === Number(id));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(Number(id));
    } else if (movie) {
      addToFavorites(movie);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const getImageUrl = (path) => {
    if (path) {
      return `${IMAGE_BASE_URL}${path}`;
    }
    return noImage;
  };

  const getTrailerUrl = () => {
    if (movie?.videos?.results && movie.videos.results.length > 0) {
      const trailer = movie.videos.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      ) || movie.videos.results[0];
      
      return `https://www.youtube.com/watch?v=${trailer.key}`;
    }
    return null;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography color="error" variant="h6">
          {error || 'Failed to load movie details'}
        </Typography>
        <Button startIcon={<ArrowBack />} onClick={handleBackClick} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      <Button startIcon={<ArrowBack />} onClick={handleBackClick} sx={{ mb: 3 }}>
        Back to Movies
      </Button>
      
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container spacing={4}>
          {/* Movie Poster */}
          <Grid item xs={12} sm={4}>
            <Box
              component="img"
              sx={{
                width: '100%',
                borderRadius: 1,
                boxShadow: 3,
              }}
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
            />
          </Grid>
          
          {/* Movie Info */}
          <Grid item xs={12} sm={8}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {movie.title} 
                {movie.release_date && (
                  <Typography component="span" variant="h6" color="text.secondary">
                    {" "}({new Date(movie.release_date).getFullYear()})
                  </Typography>
                )}
              </Typography>
              
              <IconButton 
                aria-label="add to favorites"
                onClick={handleFavoriteToggle}
                color={isFavorite ? "secondary" : "default"}
                size="large"
              >
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>
            
            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating
                name="read-only"
                value={movie.vote_average / 2}
                precision={0.5}
                readOnly
              />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
              </Typography>
            </Box>
            
            {/* Genres */}
            <Box sx={{ mb: 2 }}>
              {movie.genres && movie.genres.map((genre) => (
                <Chip 
                  key={genre.id} 
                  label={genre.name} 
                  sx={{ mr: 1, mb: 1 }} 
                  color="primary" 
                  variant="outlined"
                />
              ))}
            </Box>
            
            {/* Overview */}
            <Typography variant="h6" gutterBottom>Overview</Typography>
            <Typography variant="body1" paragraph>
              {movie.overview || 'No overview available'}
            </Typography>
            
            {/* Additional Info */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle2">Release Date</Typography>
                <Typography variant="body2">
                  {movie.release_date || 'Unknown'}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle2">Runtime</Typography>
                <Typography variant="body2">
                  {movie.runtime ? `${movie.runtime} mins` : 'Unknown'}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle2">Original Language</Typography>
                <Typography variant="body2">
                  {movie.original_language ? movie.original_language.toUpperCase() : 'Unknown'}
                </Typography>
              </Grid>
            </Grid>
            
            {/* Trailer Button */}
            {getTrailerUrl() && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<OpenInNew />}
                href={getTrailerUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Trailer
              </Button>
            )}
          </Grid>
        </Grid>
        
        {/* Cast Section */}
        {movie.credits && movie.credits.cast && movie.credits.cast.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>Top Cast</Typography>
            
            <Stack 
              direction="row" 
              spacing={2} 
              sx={{ 
                overflowX: 'auto', 
                pb: 2,
                '&::-webkit-scrollbar': {
                  height: 8,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: 4,
                }
              }}
            >
              {movie.credits.cast.slice(0, 10).map((person) => (
                <Box 
                  key={person.id} 
                  sx={{ 
                    minWidth: 100, 
                    textAlign: 'center',
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      width: 100,
                      height: 150,
                      objectFit: 'cover',
                      borderRadius: 1,
                      mb: 1,
                    }}
                    src={person.profile_path ? getImageUrl(person.profile_path) : noImage}
                    alt={person.name}
                  />
                  <Typography variant="body2" noWrap fontWeight="bold">
                    {person.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {person.character}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Paper>
    </Box>
  );