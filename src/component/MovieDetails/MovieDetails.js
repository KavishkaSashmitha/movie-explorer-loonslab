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
import { Favorite, FavoriteBorder, OpenInNew, ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, IMAGE_BASE_URL } from '../../services/api';
import { useMovieContext } from '../../context/MovieContext';
import noImage from './assets/no-image-asset.svg';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites } = useMovieContext();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isFavorite = movie ? favorites.some(fav => fav.id === movie.id) : false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleFavorite = () => {
    isFavorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  };

  const getImage = (path) => path ? `${IMAGE_BASE_URL}${path}` : noImage;

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <CircularProgress />
    </Box>
  );

  if (error || !movie) return (
    <Box textAlign="center" mt={4}>
      <Typography color="error" gutterBottom>{error || 'Movie not found'}</Typography>
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>Go Back</Button>
    </Box>
  );

  const trailer = movie.videos?.results?.find(v => 
    v.type === 'Trailer' && v.site === 'YouTube'
  ) ?? movie.videos?.results?.[0];
  const trailerUrl = trailer?.key ? `https://www.youtube.com/watch?v=${trailer.key}` : null;

  const infoItems = [
    { label: 'Release Date', value: movie.release_date },
    { label: 'Runtime', value: movie.runtime ? `${movie.runtime} mins` : 'Unknown' },
    { label: 'Language', value: movie.original_language?.toUpperCase() },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Back
      </Button>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          {/* Poster Section */}
          <Grid item xs={12} sm={4}>
            <Box
              component="img"
              src={getImage(movie.poster_path)}
              alt={movie.title}
              sx={{ width: '100%', borderRadius: 1, boxShadow: 3 }}
            />
          </Grid>

          {/* Info Section */}
          <Grid item xs={12} sm={8}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h4" gutterBottom>
                {movie.title}
                {movie.release_date && (
                  <Typography component="span" color="text.secondary">
                    {' '}({new Date(movie.release_date).getFullYear()})
                  </Typography>
                )}
              </Typography>
              <IconButton onClick={handleFavorite} color={isFavorite ? 'secondary' : 'default'}>
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Rating value={movie.vote_average / 2} precision={0.5} readOnly />
              <Typography>
                {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
              </Typography>
            </Box>

            <Box mb={2}>
              {movie.genres?.map(genre => (
                <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>

            <Typography variant="h6" gutterBottom>Overview</Typography>
            <Typography paragraph>{movie.overview || 'No overview available'}</Typography>

            <Grid container spacing={2} mb={3}>
              {infoItems.map((item, i) => (
                <Grid item xs={6} sm={4} key={i}>
                  <Typography variant="subtitle2">{item.label}</Typography>
                  <Typography variant="body2">{item.value || 'Unknown'}</Typography>
                </Grid>
              ))}
            </Grid>

            {trailerUrl && (
              <Button
                variant="contained"
                startIcon={<OpenInNew />}
                href={trailerUrl}
                target="_blank"
              >
                Watch Trailer
              </Button>
            )}
          </Grid>
        </Grid>

        {/* Cast Section */}
        {movie.credits?.cast?.length > 0 && (
          <Box mt={4}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>Top Cast</Typography>
            <Stack direction="row" spacing={2} overflow="auto" pb={2}>
              {movie.credits.cast.slice(0, 10).map(person => (
                <Box key={person.id} sx={{ minWidth: 100, textAlign: 'center' }}>
                  <Box
                    component="img"
                    src={getImage(person.profile_path)}
                    alt={person.name}
                    sx={{ 
                      width: 100, 
                      height: 150, 
                      objectFit: 'cover', 
                      borderRadius: 1, 
                      mb: 1 
                    }}
                  />
                  <Typography noWrap fontWeight="bold">{person.name}</Typography>
                  <Typography variant="caption" noWrap color="text.secondary">
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
};

export default MovieDetails;