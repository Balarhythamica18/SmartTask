import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <Card className="form-card">
      <CardContent>
        <Typography variant="h6">Profile</Typography>

        <Typography sx={{mt:2}}>
          Email: {user?.email}
        </Typography>

        <Typography sx={{mt:2}}>
          Member Since: Demo User
        </Typography>
      </CardContent>
    </Card>
  );
}
