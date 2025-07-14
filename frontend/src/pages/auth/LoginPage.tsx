import React from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';

export const LoginPage: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to TaskFlow Pro
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" mb={3}>
        Sign in to your account
      </Typography>
      <Box component="form" noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Paper>
  );
}; 