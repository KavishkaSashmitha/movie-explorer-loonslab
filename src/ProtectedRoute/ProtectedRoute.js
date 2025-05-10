import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';


const ProtectedRoute = () => {
  const { user } = useMovieContext();
  
  if (!user) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }
  
  // If logged in, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;