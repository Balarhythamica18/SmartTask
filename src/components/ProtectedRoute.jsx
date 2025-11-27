import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils/cookie';

export default function ProtectedRoute({ children }) {
  const cookie = getCookie('session');
  if (!cookie) return <Navigate to="/login" replace />;
  return children;
}
