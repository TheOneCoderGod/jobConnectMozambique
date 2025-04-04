import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Paper,
} from '@mui/material';
import {
  Work as WorkIcon,
  Mic as MicIcon,
  Phone as PhoneIcon,
  Map as MapIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const features = [
  {
    icon: <WorkIcon fontSize="large" />,
    title: "Find Jobs",
    description: "Browse available jobs and gigs in your area.",
    path: "/jobs",
    buttonText: "Explore Jobs",
  },
  {
    icon: <MicIcon fontSize="large" />,
    title: "Audio Profile",
    description: "Create a unique profile using your voice.",
    path: "/profile",
    buttonText: "Create Profile",
  },
  {
    icon: <PhoneIcon fontSize="large" />,
    title: "USSD Access",
    description: "Accessible without internet via USSD (*123#).",
    path: "/ussd",
    buttonText: "Try USSD",
  },
  {
    icon: <MapIcon fontSize="large" />,
    title: "Offline Map",
    description: "Locate job centers without internet access.",
    path: "/offline-map",
    buttonText: "View Offline Map",
  },
];

const HomePage: React.FC = () => (
  <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
    <Box textAlign="center" mb={6}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
        JobConnect Moçambique
      </Typography>
      <Typography variant="h6" color="text.secondary" maxWidth={700} mx="auto">
        Connecting workers to opportunities across Mozambique, online or offline.
      </Typography>
    </Box>

    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
      {features.map((feature, idx) => (
        <Card
          key={idx}
          component={Paper}
          elevation={3}
          sx={{
            width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 16px)' },
            borderRadius: 4,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 },
          }}
        >
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {feature.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" px={1}>
              {feature.description}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
            <Button
              component={RouterLink}
              to={feature.path}
              variant="contained"
              sx={{ textTransform: 'none', borderRadius: 2, px: 3 }}
            >
              {feature.buttonText}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>

    <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, mt: 8, borderRadius: 4, bgcolor: 'background.default' }}>
      <Typography variant="h4" component="h2" fontWeight={600} color="primary.main" mb={3}>
        How JobConnect Works
      </Typography>
      <Typography variant="body1" color="text.secondary" lineHeight={1.7} mb={2}>
        JobConnect enables you to access job opportunities even without consistent internet connectivity. Create an audio-based profile, search job listings, and interact with potential employers directly from your basic mobile phone.
      </Typography>
      <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
        With offline map support and USSD technology, JobConnect ensures that everyone, everywhere in Mozambique, has equal access to employment opportunities.
      </Typography>
    </Paper>
  </Container>
);

export default HomePage;