import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Grid,
  Button,
  Alert,
  AlertTitle,
  Divider,
  Switch,
  FormControlLabel,
  CircularProgress
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import SaveIcon from '@mui/icons-material/Save';
import TextToSpeech from '../components/accessibility/TextToSpeech';
import OfflineMap from '../components/map/OfflineMap';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  selectLastUpdated,
  selectIsMapDataCached,
  setCacheStatus,
  fetchMapDataStart,
  fetchMapDataSuccess,
  selectOfflineMapLoading,
  selectOfflineMapError
} from '../store/slices/offlineMapSlice';

const OfflineMapPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const lastUpdated = useAppSelector(selectLastUpdated);
  const isMapDataCached = useAppSelector(selectIsMapDataCached);
  const isLoading = useAppSelector(selectOfflineMapLoading);
  const error = useAppSelector(selectOfflineMapError);
  
  // Local state
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  
  // Format date to be more readable
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Handle offline mode toggle
  const handleOfflineModeToggle = () => {
    setIsOfflineMode(!isOfflineMode);
  };
  
  // Get locations and job opportunities from state
  const locations = useAppSelector(state => state.offlineMap.locations);
  const jobOpportunities = useAppSelector(state => state.offlineMap.jobOpportunities);
  
  // Handle refresh map data
  const handleRefreshMapData = () => {
    dispatch(fetchMapDataStart());
    
    // Simulate API call to fetch new map data
    setTimeout(() => {
      // In a real app, we would fetch actual data from the server
      // For now, we'll just update the last updated timestamp
      dispatch(fetchMapDataSuccess({
        locations,
        jobOpportunities
      }));
    }, 2000);
  };
  
  // Handle save map data for offline use
  const handleSaveMapData = () => {
    dispatch(setCacheStatus(true));
    
    // In a real app, we would save the data to IndexedDB or localStorage
    // For now, we'll just show a success message via the isMapDataCached state
  };
  
  // Check if data was updated more than 7 days ago
  const isDataStale = (): boolean => {
    if (!lastUpdated) return true;
    
    const lastUpdatedDate = new Date(lastUpdated);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - lastUpdatedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 7;
  };
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <MapIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          6. Offline Opportunities Map
        </Typography>
        
        <Typography variant="body1" paragraph>
          Find job opportunities near you on this map. The map works offline, so you can view jobs even without internet.
          Save the map data when you have internet to use it later when you're offline.
        </Typography>
        
        <TextToSpeech 
          text="On this page, you can find job opportunities on a map. This map works offline, so you can view jobs even when you don't have internet. When you have internet connection, save the map data to use it later when you're offline."
          language="en-US"
        />
        
        <Grid container spacing={3}>
          <Grid >
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  {isOfflineMode ? (
                    <>
                      <CloudOffIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Offline Mode
                    </>
                  ) : (
                    <>
                      <MapIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Online Mode
                    </>
                  )}
                </Typography>
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={isOfflineMode} 
                      onChange={handleOfflineModeToggle} 
                      color="primary"
                    />
                  }
                  label="Offline Mode"
                />
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              {isOfflineMode && !isMapDataCached && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  <AlertTitle>No Offline Data Available</AlertTitle>
                  Switch to online mode and save map data for offline use.
                </Alert>
              )}
              
              {isDataStale() && !isLoading && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  <AlertTitle>Map Data May Be Outdated</AlertTitle>
                  Last updated: {formatDate(lastUpdated)}. Consider refreshing the data when you have internet.
                </Alert>
              )}
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              )}
              
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button 
                  variant="contained" 
                  startIcon={<RefreshIcon />}
                  onClick={handleRefreshMapData}
                  disabled={isOfflineMode || isLoading}
                >
                  {isLoading ? 'Refreshing...' : 'Refresh Map Data'}
                </Button>
                
                <Button 
                  variant="contained" 
                  color="success"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveMapData}
                  disabled={isOfflineMode || isMapDataCached || isLoading}
                >
                  Save for Offline Use
                </Button>
              </Box>
              
              {isLoading && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <CircularProgress size={24} sx={{ mr: 2 }} />
                  <Typography>Loading map data...</Typography>
                </Box>
              )}
              
              <Typography variant="body2" color="text.secondary">
                Last updated: {formatDate(lastUpdated)}
              </Typography>
            </Paper>
          </Grid>
          
          <Grid >
            <OfflineMap height={600} />
          </Grid>
          
          <Grid >
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                How to Use the Offline Map
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="body1" paragraph>
                This map helps you find job opportunities in different locations across Mozambique. Here's how to use it:
              </Typography>
              
              <Grid container spacing={2}>
                <Grid >
                  <Typography variant="subtitle1" gutterBottom>
                    1. Save Map Data for Offline Use
                  </Typography>
                  <Typography variant="body2" paragraph>
                    When you have internet, click "Save for Offline Use" to store the map data on your device.
                    This allows you to view the map even when you don't have internet.
                  </Typography>
                  
                  <Typography variant="subtitle1" gutterBottom>
                    2. Browse Job Locations
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Click on a location in the list or on the map to see job opportunities in that area.
                    Popular locations have more job opportunities.
                  </Typography>
                </Grid>
                
                <Grid>
                  <Typography variant="subtitle1" gutterBottom>
                    3. View Job Details
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Click on a job marker on the map to see details about that job opportunity.
                    You can see the payment, employer, and contact information.
                  </Typography>
                  
                  <Typography variant="subtitle1" gutterBottom>
                    4. Contact Employers
                  </Typography>
                  <Typography variant="body2">
                    When you find a job you're interested in, you can call the employer directly from the app.
                    The phone number works even when you're offline.
                  </Typography>
                </Grid>
              </Grid>
              
              <Alert severity="info" sx={{ mt: 3 }}>
                <AlertTitle>Tip</AlertTitle>
                Job opportunities marked as "Urgent" need to be filled quickly. Apply for these jobs as soon as possible!
              </Alert>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default OfflineMapPage;
