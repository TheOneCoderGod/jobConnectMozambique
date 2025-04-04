import React from 'react';
import { Box, Container, Typography, Link, Grid, useTheme } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';

const Footer = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.primary.main,
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          <Grid >
            <Box display="flex" alignItems="center" mb={1}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                Contact
              </Typography>
            </Box>
            <Typography variant="body1" component="div" sx={{ mb: 1 }}>
              Call: *123# (USSD)
            </Typography>
            <Typography variant="body1" component="div">
              WhatsApp: +258 84 000 0000
            </Typography>
          </Grid>
          
          <Grid >
            <Box display="flex" alignItems="center" mb={1}>
              <HelpIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                Help
              </Typography>
            </Box>
            <Link 
              href="#" 
              color="inherit" 
              underline="hover"
              sx={{ 
                display: 'block', 
                mb: 1,
                fontSize: '1rem'
              }}
            >
              How to Use
            </Link>
            <Link 
              href="#" 
              color="inherit" 
              underline="hover"
              sx={{ 
                display: 'block',
                fontSize: '1rem'
              }}
            >
              FAQ
            </Link>
          </Grid>
          
          <Grid >
            <Box display="flex" alignItems="center" mb={1}>
              <InfoIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                About
              </Typography>
            </Box>
            <Link 
              href="#" 
              color="inherit" 
              underline="hover"
              sx={{ 
                display: 'block', 
                mb: 1,
                fontSize: '1rem'
              }}
            >
              About JobConnect
            </Link>
            <Link 
              href="#" 
              color="inherit" 
              underline="hover"
              sx={{ 
                display: 'block',
                fontSize: '1rem'
              }}
            >
              Privacy Policy
            </Link>
          </Grid>
        </Grid>
        
        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            © {new Date().getFullYear()} JobConnect Mozambique. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
