import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Dashboard de Compras</Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
}
