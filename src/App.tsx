import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CircularProgress, Container } from '@mui/material';
import ResponsiveAppBar from './components/layout/ResponsiveAppBar';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';
import OfflineAlert from './components/common/OfflineAlert';
import AccessibilityControls from './components/accessibility/AccessibilityControls';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const JobsPage = lazy(() => import('./pages/JobsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const UssdSimulationPage = lazy(() => import('./pages/UssdSimulationPage'));
const OfflineMapPage = lazy(() => import('./pages/OfflineMapPage'));
const VoiceReadingPage = lazy(() => import('./pages/VoiceReadingPage'));
const WhatsAppPage = lazy(() => import('./pages/WhatsAppPage'));
const OptimizationPage = lazy(() => import('./pages/OptimizationPage'));
const LanguagePage = lazy(() => import('./pages/LanguagePage'));
const GigsPage = lazy(() => import('./pages/GigsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Loading component for suspense fallback
const LoadingComponent = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="50vh"
  >
    <CircularProgress size={60} thickness={4} />
  </Box>
);

function App() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: (theme) => theme.palette.background.default
      }}
    >
      <ErrorBoundary>
        <OfflineAlert />
        <ResponsiveAppBar />
        <Container 
          component="main" 
          maxWidth="lg" 
          sx={{ 
            flexGrow: 1, 
            py: 3,
            px: { xs: 1, sm: 2, md: 3 } // Responsive padding
          }}
        >
          <Suspense fallback={<LoadingComponent />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/ussd" element={<UssdSimulationPage />} />
              <Route path="/offline-map" element={<OfflineMapPage />} />
              <Route path="/voice-reading" element={<VoiceReadingPage />} />
              <Route path="/whatsapp" element={<WhatsAppPage />} />
              <Route path="/optimization" element={<OptimizationPage />} />
              <Route path="/language" element={<LanguagePage />} />
              <Route path="/gigs" element={<GigsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Container>
        <Footer />
        <AccessibilityControls />
      </ErrorBoundary>
    </Box>
  );
}

export default App;