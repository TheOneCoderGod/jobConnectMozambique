import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Switch, 
  FormControlLabel, 
  Divider, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Chip,
  Grid,
  Button,
  Slider,
  Container
} from '@mui/material';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import SpeedIcon from '@mui/icons-material/Speed';
import MemoryIcon from '@mui/icons-material/Memory';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import StorageIcon from '@mui/icons-material/Storage';
import ImageIcon from '@mui/icons-material/Image';
import AnimationIcon from '@mui/icons-material/Animation';
import TextToSpeech from '../components/accessibility/TextToSpeech';
import { useOptimization } from '../utils/OptimizationContext';

const OptimizationPage: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    detectDeviceCapabilities, 
    enableLowPowerMode 
  } = useOptimization();
  
  // Handle low power mode toggle
  const handleLowPowerModeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    enableLowPowerMode(event.target.checked);
  };
  
  // Handle animation toggle
  const handleAnimationsToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ enableAnimations: event.target.checked });
  };
  
  // Handle prefetch toggle
  const handlePrefetchToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ prefetchEnabled: event.target.checked });
  };
  
  // Handle auto clear cache toggle
  const handleAutoClearCacheToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ autoClearOldCache: event.target.checked });
  };
  
  // Handle image quality change
  const handleImageQualityChange = (_event: Event, value: number | number[]) => {
    updateSettings({ imageQuality: value as number });
  };
  
  // Handle items per page change
  const handleItemsPerPageChange = (_event: Event, value: number | number[]) => {
    updateSettings({ itemsPerPage: value as number });
  };
  
  // Get device status chip
  const getDeviceStatusChip = (isLow: boolean, label: string) => {
    return (
      <Chip 
        label={label} 
        color={isLow ? "error" : "success"} 
        size="small" 
        variant="outlined" 
      />
    );
  };
  
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <SpeedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          7. Performance Optimization
        </Typography>
        
        <Typography variant="body1" paragraph>
          JobConnect automatically adjusts to work well on your device. You can also manually
          change settings to improve performance on basic phones or save battery.
        </Typography>
        
        <TextToSpeech 
          text="This page allows you to optimize the app for your device. JobConnect automatically adjusts to work well on basic phones, but you can also manually change settings to improve performance or save battery."
          language="en-US"
        />
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  <BatteryAlertIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Low Power Mode
                </Typography>
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={settings.lowPowerMode} 
                      onChange={handleLowPowerModeToggle} 
                      color="primary"
                    />
                  }
                  label="Enable"
                />
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="body1" paragraph>
                Low Power Mode reduces battery usage by turning off animations, lowering image quality,
                and reducing background activity. This is automatically enabled when your battery is low.
              </Typography>
              
              {settings.isLowBattery && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  Your device battery is low. Low Power Mode has been automatically enabled.
                </Alert>
              )}
              
              <Button 
                variant="contained" 
                onClick={() => detectDeviceCapabilities()}
                sx={{ mt: 1 }}
              >
                Detect Device Capabilities
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                <MemoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Device Status
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <SignalCellularAltIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Network Connection" 
                    secondary={settings.isSlowConnection ? "Slow (2G/3G)" : "Fast (4G/WiFi)"} 
                  />
                  {getDeviceStatusChip(settings.isSlowConnection, settings.isSlowConnection ? "Slow" : "Fast")}
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <MemoryIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Device Memory" 
                    secondary={settings.isLowMemoryDevice ? "Limited Memory" : "Sufficient Memory"} 
                  />
                  {getDeviceStatusChip(settings.isLowMemoryDevice, settings.isLowMemoryDevice ? "Low" : "OK")}
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <SpeedIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Device Performance" 
                    secondary={settings.isLowEndDevice ? "Basic Device" : "Standard Device"} 
                  />
                  {getDeviceStatusChip(settings.isLowEndDevice, settings.isLowEndDevice ? "Basic" : "Good")}
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <BatteryAlertIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Battery Status" 
                    secondary={settings.isLowBattery ? "Low Battery" : "Battery OK"} 
                  />
                  {getDeviceStatusChip(settings.isLowBattery, settings.isLowBattery ? "Low" : "OK")}
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <StorageIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Available Storage" 
                    secondary={`${settings.availableStorageMB} MB available`} 
                  />
                  {getDeviceStatusChip(settings.availableStorageMB < 100, settings.availableStorageMB < 100 ? "Low" : "OK")}
                </ListItem>
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                <SpeedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Performance Settings
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={settings.enableAnimations} 
                      onChange={handleAnimationsToggle} 
                      color="primary"
                      disabled={settings.lowPowerMode}
                    />
                  }
                  label="Enable Animations"
                />
                
                <Typography variant="body2" color="text.secondary">
                  Turn off animations to improve performance on basic devices.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={settings.prefetchEnabled} 
                      onChange={handlePrefetchToggle} 
                      color="primary"
                      disabled={settings.lowPowerMode}
                    />
                  }
                  label="Prefetch Content"
                />
                
                <Typography variant="body2" color="text.secondary">
                  Preload content for faster navigation (uses more data).
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={settings.autoClearOldCache} 
                      onChange={handleAutoClearCacheToggle} 
                      color="primary"
                    />
                  }
                  label="Auto-Clear Old Cache"
                />
                
                <Typography variant="body2" color="text.secondary">
                  Automatically remove old cached data to save storage space.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <ImageIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Content Quality Settings
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography id="image-quality-slider" gutterBottom>
                  Image Quality: {Math.round(settings.imageQuality * 100)}%
                </Typography>
                <Slider
                  value={settings.imageQuality}
                  onChange={handleImageQualityChange}
                  aria-labelledby="image-quality-slider"
                  step={0.1}
                  marks
                  min={0.3}
                  max={1}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                  disabled={settings.lowPowerMode}
                />
                <Typography variant="body2" color="text.secondary">
                  Lower image quality reduces data usage and improves loading speed.
                </Typography>
              </Box>
              
              <Box>
                <Typography id="items-per-page-slider" gutterBottom>
                  Items Per Page: {settings.itemsPerPage}
                </Typography>
                <Slider
                  value={settings.itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  aria-labelledby="items-per-page-slider"
                  step={5}
                  marks
                  min={5}
                  max={30}
                  valueLabelDisplay="auto"
                  disabled={settings.lowPowerMode}
                />
                <Typography variant="body2" color="text.secondary">
                  Fewer items per page improves performance on basic devices.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <AnimationIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Current Optimization Strategy
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Render Strategy: {settings.renderStrategy.charAt(0).toUpperCase() + settings.renderStrategy.slice(1)}
                </Typography>
                <Typography variant="body2" paragraph>
                  {settings.renderStrategy === 'simple' && 'Using simplified UI components for basic devices.'}
                  {settings.renderStrategy === 'normal' && 'Using standard UI components for average devices.'}
                  {settings.renderStrategy === 'advanced' && 'Using enhanced UI components for high-end devices.'}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Refresh Interval: {settings.refreshInterval / 1000} seconds
                </Typography>
                <Typography variant="body2">
                  Background data is refreshed every {settings.refreshInterval / 1000} seconds.
                  {settings.lowPowerMode && ' Longer interval is used to save battery.'}
                </Typography>
              </Box>
              
              <Alert severity="info" sx={{ mt: 3 }}>
                JobConnect automatically adjusts these settings based on your device capabilities.
                Manual changes will be remembered for future sessions.
              </Alert>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default OptimizationPage;
