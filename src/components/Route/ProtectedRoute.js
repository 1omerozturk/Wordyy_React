import React from 'react';
import { Navigate } from 'react-router-dom';
import isAuthenticated from './IsAuthenticated';

function ProtectedRoute({ children}) {
  const auth = isAuthenticated();
  if (auth) {
    return children;
  }
  return <Navigate to="/login" />;
}

export default ProtectedRoute;