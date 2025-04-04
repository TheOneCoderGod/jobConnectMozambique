import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';

/**
 * A visually enhanced footer with three columns (Contact, Help, About).
 * Creates a wave at the top for a more modern, “professional designer” look.
 */
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        mt: 'auto',
        width: '100%',
        // Large, vivid gradient background
        background: 'linear-gradient(120deg, #1976d2 0%, #42a5f5 100%)',
        color: '#fff',
        overflow: 'hidden', // So the wave shape at the top doesn't expand the box
      }}
    >
      {/* Wave Shape at the Top */}
      <Box
        sx={{
          position: 'absolute',
          top: '-50px',
          left: 0,
          right: 0,
          height: '100px',
          // White wave shape – tweak the clipPath for different styles
          backgroundColor: '#fff',
          clipPath: 'ellipse(70% 100% at 50% 0%)',
          zIndex: 1, // Ensure wave is on top
        }}
      />

      <Box
        sx={{
          position: 'relative',
          pt: 8, // top padding
          pb: 6, // bottom padding
          zIndex: 2, // content above the wave
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            columnSpacing={6} // horizontal gap between columns
            rowSpacing={4}    // vertical gap on smaller screens
            justifyContent="space-between"
          >
            {/* Contact Column */}
            <Box sx={{ flex: '1 1 auto', minWidth: 240 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <PhoneIcon sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Contact
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Call: *123#
              </Typography>
              <Typography variant="body1">
                WhatsApp: +258 84 000 0000
              </Typography>
            </Box>

            {/* Help Column */}
            <Box sx={{ flex: '1 1 auto', minWidth: 240 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <HelpIcon sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Help
                </Typography>
              </Box>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ display: 'block', mb: 1, fontSize: '1rem' }}
              >
                How to Use
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ display: 'block', fontSize: '1rem' }}
              >
                FAQ
              </Link>
            </Box>

            {/* About Column */}
            <Box sx={{ flex: '1 1 auto', minWidth: 240 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <InfoIcon sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  About
                </Typography>
              </Box>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ display: 'block', mb: 1, fontSize: '1rem' }}
              >
                About JobConnect
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ display: 'block', fontSize: '1rem' }}
              >
                Privacy Policy
              </Link>
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Footer Bottom Bar */}
      <Box
        sx={{
          py: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          © {new Date().getFullYear()} JobConnect Mozambique. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
