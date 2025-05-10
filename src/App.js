import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { MovieProvider, useMovieContext } from './context/MovieContext';
import Header from './component/Header/Header';
import Login from './component/Login/Login';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Home from './component/Home/Home';

import Favorites from './component/Favorites/Favorites';

// Components

// Main app with theme based on context
const AppContent = () => {
  const { darkMode } = useMovieContext();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '100vh'
        }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                {/* <Route path="/movie/:id" element={<MovieDetails />} /> */}
                <Route path="/favorites" element={<Favorites />} />
              </Route>
              
              {/* Redirect for all other paths */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

// Main App component with Provider wrapper
const App = () => {
  return (
    <MovieProvider>
      <AppContent />
    </MovieProvider>
  );
};

export default App;