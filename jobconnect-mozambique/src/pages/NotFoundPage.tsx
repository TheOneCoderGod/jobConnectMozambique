import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper,
  Grid
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 8, textAlign: 'center' }}>
        <Paper 
          elevation={3} 
          sx={{ 
            py: 6, 
            px: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            borderRadius: 2
          }}
        >
          <ErrorIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
          
          <Typography variant="h3" component="h1" gutterBottom>
            404
          </Typography>
          
          <Typography variant="h5" component="h2" gutterBottom>
            Page Not Found
          </Typography>
          
          <Typography variant="body1" color="textSecondary" paragraph sx={{ maxWidth: 500 }}>
            The page you are looking for doesn't exist or has been moved.
            Please check the URL or try one of the options below.
          </Typography>
          
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Grid item>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                component={RouterLink}
                to="/"
                startIcon={<HomeIcon />}
              >
                Go to Home
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="outlined" 
                color="primary" 
                size="large"
                component={RouterLink}
                to="/jobs"
                startIcon={<SearchIcon />}
              >
                Find Jobs
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
