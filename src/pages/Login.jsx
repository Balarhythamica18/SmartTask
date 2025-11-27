import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from '@mui/material/Snackbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email,setEmail] = useState("");
  const [pw,setPw] = useState("");
  const [remember,setRemember] = useState(false);
  const [loading,setLoading] = useState(false);
  const [snack,setSnack] = useState(null);

  const auth = useAuth();
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.login({ email, remember });
      setSnack("Logged in");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="center" sx={{minHeight:"70vh"}}>
      <Card className="form-card" sx={{width:380}}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Login</Typography>

          <form onSubmit={submit}>
            <TextField label="Email" value={email} fullWidth required margin="normal"
              onChange={e => setEmail(e.target.value)} />

            <TextField label="Password" type="password" value={pw} fullWidth required margin="normal"
              onChange={e => setPw(e.target.value)} />

            <FormControlLabel
              control={<Checkbox checked={remember} onChange={e => setRemember(e.target.checked)} />}
              label="Remember Me"
            />

            <Button variant="contained" type="submit" fullWidth disabled={loading} sx={{mt:2}}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>

      <Snackbar open={!!snack} autoHideDuration={2000} message={snack} onClose={()=>setSnack(null)} />
    </Box>
  );
}
