import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
          <Typography variant="h6" className="brand">TaskDash</Typography>

          <Box>
            <Button component={RouterLink} to="/dashboard">Dashboard</Button>
            <Button component={RouterLink} to="/tasks">Tasks</Button>
            <Button component={RouterLink} to="/profile">Profile</Button>
            {user && <Button onClick={logout}>Logout</Button>}
          </Box>
        </Toolbar>
      </AppBar>

      <main className="app-shell">{children}</main>
    </Box>
  );
}
