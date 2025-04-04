import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardActions, Container } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import MicIcon from '@mui/icons-material/Mic';
import PhoneIcon from '@mui/icons-material/Phone';
import MapIcon from '@mui/icons-material/Map';
import { Link as RouterLink } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          JobConnect Moçambique
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary" paragraph>
          Connecting workers to opportunities across Mozambique
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid >
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <WorkIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
              <Typography gutterBottom variant="h5" component="h2">
                1. Find Jobs
              </Typography>
              <Typography>
                Browse available jobs and gigs in your area
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
              <Button 
                size="large" 
                variant="contained" 
                component={RouterLink} 
                to="/jobs"
                startIcon={<WorkIcon />}
              >
                Find Jobs
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid >
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <MicIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
              <Typography gutterBottom variant="h5" component="h2">
                2. Audio Profile
              </Typography>
              <Typography>
                Create your profile using voice recording
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
              <Button 
                size="large" 
                variant="contained" 
                component={RouterLink} 
                to="/profile"
                startIcon={<MicIcon />}
              >
                Record Profile
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid >
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <PhoneIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
              <Typography gutterBottom variant="h5" component="h2">
                3. USSD Access
              </Typography>
              <Typography>
                Use without internet via USSD (*123#)
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
              <Button 
                size="large" 
                variant="contained" 
                component={RouterLink} 
                to="/ussd"
                startIcon={<PhoneIcon />}
              >
                USSD Simulation
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid >
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <MapIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
              <Typography gutterBottom variant="h5" component="h2">
                4. Offline Map
              </Typography>
              <Typography>
                Find job centers even without internet
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
              <Button 
                size="large" 
                variant="contained" 
                component={RouterLink} 
                to="/offline-map"
                startIcon={<MapIcon />}
              >
                View Map
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, mb: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom>
          How JobConnect Works
        </Typography>
        <Typography paragraph>
          JobConnect Moçambique helps you find work opportunities even with limited internet access. 
          You can create an audio profile, search for jobs, and connect with employers using basic phones.
        </Typography>
        <Typography paragraph>
          Our platform works offline and supports USSD for areas with poor connectivity.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
