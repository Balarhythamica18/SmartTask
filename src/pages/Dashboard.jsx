import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const raw = localStorage.getItem('tasks');
  const tasks = raw ? JSON.parse(raw) : [];

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  return (
    <Card className="form-card">
      <CardContent>
        <Typography variant="h5">Hello, {user?.email}</Typography>
        <Typography sx={{mt:2}}>Tasks: {total} • Completed: {completed}</Typography>

        <Button component={RouterLink} to="/tasks" variant="contained" sx={{mt:2}}>
          Go to Tasks
        </Button>
      </CardContent>
    </Card>
  );
}
