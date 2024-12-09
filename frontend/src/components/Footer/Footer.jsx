import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        backgroundColor: '#333', // Dark background
        color: 'white',
        padding: '20px 0',
        position: 'relative',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            textAlign: 'center',
          }}
        >
          <Typography variant="body1" sx={{ mb: { xs: 2, sm: 0 } }}>
            © 2024 Freshly. All Rights Reserved.
          </Typography>
          <Box>
            <Typography variant="body2">
              <a href="/about" style={{ color: 'white', margin: '0 10px' }}>
                About
              </a>
              <a href="/contact" style={{ color: 'white', margin: '0 10px' }}>
                Contact
              </a>
              <a href="/privacy" style={{ color: 'white', margin: '0 10px' }}>
                Privacy
              </a>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
