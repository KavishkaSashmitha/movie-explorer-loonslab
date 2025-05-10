import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  IconButton, 
  Box, 
  Rating, 
  Tooltip 
} from '@mui/material';
import { Favorite, FavoriteBorder, Info } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../../services/api';
import { useMovieContext } from '../../context/MovieContext';


const MovieCard = ({ movie }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useMovieContext();
  const navigate = useNavigate();
  const noImage = 'https://via.placeholder.com/300x450?text=No+Image+Available';
  
  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const getImageUrl = () => {
    if (movie.poster_path) {
      return `${IMAGE_BASE_URL}${movie.poster_path}`;
    }
    return noImage;
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
          cursor: 'pointer'
        }
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="300"
        image={getImageUrl()}
        alt={movie.title}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {movie.title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating
            name="read-only"
            value={movie.vote_average / 2}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({movie.vote_average?.toFixed(1) || 'N/A'})
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing>
        <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
          <IconButton 
            aria-label="add to favorites"
            onClick={handleFavoriteToggle}
            color={isFavorite ? "secondary" : "default"}
          >
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
        
        <Tooltip title="See details">
          <IconButton 
            aria-label="info"
            onClick={handleCardClick}
          >
            <Info />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default MovieCard;