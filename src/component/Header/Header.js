import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Switch,
  FormControlLabel
} from '@mui/material';
import { Brightness4, Brightness7, ExitToApp } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useMovieContext } from '../../context/MovieContext';
import SearchBar from '../SearchBar/SearchBar';

const Header = () => {
  const { darkMode, toggleDarkMode, user, logout, resetSearch } = useMovieContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLogoClick = () => {
    resetSearch();
    navigate('/');
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            cursor: 'pointer', 
            flexGrow: { xs: 0, sm: 1 },
            mr: { xs: 1, sm: 0 }
          }}
          onClick={handleLogoClick}
        >
          Movie Explorer
        </Typography>

        {user && (
          <>
            <Box sx={{ 
              flexGrow: 2, 
              display: 'flex', 
              justifyContent: 'center',
              mr: { xs: 1, sm: 2 },
              ml: { xs: 0, sm: 2 },
              width: { xs: '100%', sm: 'auto' }
            }}>
              <SearchBar />
            </Box>

            <Box sx={{ 
              display: 'flex',
              alignItems: 'center', 
              flexGrow: 0
            }}>
              <Button 
                color="inherit" 
                component={Link} 
                to="/favorites"
                sx={{ 
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Favorites
              </Button>

              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    color="default"
                  />
                }
                label={
                  <IconButton color="inherit" size="small">
                    {darkMode ? <Brightness7 /> : <Brightness4 />}
                  </IconButton>
                }
                sx={{ mx: 1 }}
              />

              <Button 
                color="inherit"
                onClick={handleLogout}
                startIcon={<ExitToApp />}
                sx={{ 
                  display: { xs: 'none', sm: 'flex' }
                }}
              >
                Logout
              </Button>
              
              <IconButton 
                color="inherit" 
                onClick={handleLogout}
                sx={{ 
                  display: { xs: 'flex', sm: 'none' }
                }}
              >
                <ExitToApp />
              </IconButton>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;