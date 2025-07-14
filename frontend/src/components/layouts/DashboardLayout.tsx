import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export const DashboardLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Add sidebar and header here later */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}; 