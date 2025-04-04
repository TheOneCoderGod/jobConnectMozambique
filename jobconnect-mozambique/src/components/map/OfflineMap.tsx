import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  Chip,
  Button,
  Alert,
  useTheme
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import PhoneIcon from '@mui/icons-material/Phone';
import { useAppDispatch, useAppSelector } from '../../store';
import { 
  selectAllLocations,
  selectSelectedLocation,
  selectJobsByLocation,
  selectSelectedJob,
  selectLocation,
  clearSelectedLocation,
  selectJob,
  clearSelectedJob,
  Location,
  MapJobOpportunity
} from '../../store/slices/offlineMapSlice';

// Fix for the marker icon issue in react-leaflet
// This is needed because webpack handles assets differently
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom marker icons for different job categories
const getMarkerIcon = (category: string, isUrgent: boolean = false) => {
  const iconSize = [25, 41];
  const iconAnchor = [12, 41];
  const popupAnchor = [1, -34];
  const shadowSize = [41, 41];
  
  let iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
  
  // In a real app, we would use custom icons for each category
  // For now, we'll just use the default icon with different colors
  
  return new L.Icon({
    iconUrl,
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize,
    iconAnchor,
    popupAnchor,
    shadowSize
  });
};

// Component to set the map view when location changes
const SetViewOnSelect = ({ location }: { location: Location | null }) => {
  const map = useMap();
  
  useEffect(() => {
    if (location) {
      map.setView([location.latitude, location.longitude], 13);
    } else {
      // Default view of Mozambique
      map.setView([-18.6657, 35.5296], 6);
    }
  }, [location, map]);
  
  return null;
};

interface OfflineMapProps {
  height?: string | number;
}

const OfflineMap: React.FC<OfflineMapProps> = ({ height = 500 }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  
  const locations = useAppSelector(selectAllLocations);
  const selectedLocation = useAppSelector(selectSelectedLocation);
  const jobsByLocation = useAppSelector(selectJobsByLocation);
  const selectedJob = useAppSelector(selectSelectedJob);
  
  // Handle location selection
  const handleLocationSelect = (locationId: string) => {
    dispatch(selectLocation(locationId));
  };
  
  // Handle job selection
  const handleJobSelect = (jobId: string) => {
    dispatch(selectJob(jobId));
  };
  
  // Handle clear selection
  const handleClearSelection = () => {
    dispatch(clearSelectedLocation());
  };
  
  // Format date to be more readable
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
      <Paper sx={{ flex: 1, p: 2, height: { xs: 'auto', md: height } }}>
        <Typography variant="h6" gutterBottom>
          <LocationOnIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Job Locations
        </Typography>
        
        <Divider sx={{ mb: 2 }} />
        
        <Alert severity="info" sx={{ mb: 2 }}>
          This map works offline! Job locations are cached for when you don't have internet.
        </Alert>
        
        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
          {locations.map((location) => (
            <ListItem 
              key={location.id}
              button
              selected={selectedLocation?.id === location.id}
              onClick={() => handleLocationSelect(location.id)}
              sx={{ 
                borderLeft: selectedLocation?.id === location.id 
                  ? `4px solid ${theme.palette.primary.main}` 
                  : '4px solid transparent',
                bgcolor: selectedLocation?.id === location.id 
                  ? 'rgba(0, 0, 0, 0.04)' 
                  : 'transparent'
              }}
            >
              <ListItemText 
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1">
                      {location.name}
                    </Typography>
                    {location.isPopular && (
                      <Chip 
                        label="Popular" 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>
                }
                secondary={`${location.jobCount} job opportunities`}
              />
            </ListItem>
          ))}
        </List>
        
        {selectedLocation && (
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="outlined" 
              size="small"
              onClick={handleClearSelection}
            >
              Show All Locations
            </Button>
          </Box>
        )}
      </Paper>
      
      <Paper sx={{ flex: 2, overflow: 'hidden', height }}>
        <MapContainer 
          center={[-18.6657, 35.5296]} 
          zoom={6} 
          style={{ height: '100%', width: '100%' }}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          <SetViewOnSelect location={selectedLocation} />
          
          {/* Render location markers */}
          {locations.map((location) => (
            <Marker 
              key={location.id}
              position={[location.latitude, location.longitude]}
              eventHandlers={{
                click: () => handleLocationSelect(location.id)
              }}
            >
              <Popup>
                <Typography variant="subtitle1">
                  {location.name}
                </Typography>
                <Typography variant="body2">
                  {location.jobCount} job opportunities
                </Typography>
                <Button 
                  size="small" 
                  onClick={() => handleLocationSelect(location.id)}
                  sx={{ mt: 1 }}
                >
                  View Jobs
                </Button>
              </Popup>
            </Marker>
          ))}
          
          {/* Render job markers for selected location */}
          {selectedLocation && jobsByLocation.map((job) => (
            <Marker 
              key={job.id}
              position={[job.latitude, job.longitude]}
              icon={getMarkerIcon(job.category, job.isUrgent)}
              eventHandlers={{
                click: () => handleJobSelect(job.id)
              }}
            >
              <Popup>
                <Typography variant="subtitle1">
                  {job.title}
                </Typography>
                <Typography variant="body2">
                  {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
                </Typography>
                <Typography variant="body2">
                  Payment: {job.payment}
                </Typography>
                <Button 
                  size="small" 
                  onClick={() => handleJobSelect(job.id)}
                  sx={{ mt: 1 }}
                >
                  View Details
                </Button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Paper>
      
      {selectedJob && (
        <Paper sx={{ flex: 1, p: 2, height: { xs: 'auto', md: height } }}>
          <Typography variant="h6" gutterBottom>
            <WorkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Job Details
          </Typography>
          
          <Divider sx={{ mb: 2 }} />
          
          <Typography variant="subtitle1" gutterBottom>
            {selectedJob.title}
          </Typography>
          
          <Chip 
            label={selectedJob.category.charAt(0).toUpperCase() + selectedJob.category.slice(1)} 
            size="small" 
            color="primary" 
            sx={{ mb: 2 }}
          />
          
          {selectedJob.isUrgent && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Urgent job - Apply quickly!
            </Alert>
          )}
          
          <List dense>
            <ListItem>
              <ListItemText 
                primary="Location" 
                secondary={selectedJob.location} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Payment" 
                secondary={selectedJob.payment} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Employer" 
                secondary={selectedJob.employerName} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Expires" 
                secondary={formatDate(selectedJob.expiryDate)} 
              />
            </ListItem>
          </List>
          
          <Divider sx={{ my: 2 }} />
          
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<PhoneIcon />}
            fullWidth
            sx={{ mb: 1 }}
          >
            Call Employer
          </Button>
          
          <Typography variant="body2" color="text.secondary" align="center">
            {selectedJob.contactNumber}
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => dispatch(clearSelectedJob())}
            >
              Back to Jobs
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default OfflineMap;
