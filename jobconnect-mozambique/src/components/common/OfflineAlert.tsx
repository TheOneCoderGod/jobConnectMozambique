import React, { useState, useEffect } from 'react';
import { Alert, Snackbar, Typography, Box } from '@mui/material';
import WifiOffIcon from '@mui/icons-material/WifiOff';

const OfflineAlert: React.FC = () => {
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    // Initial check
    setIsOffline(!navigator.onLine);
    setShowAlert(!navigator.onLine);

    // Set up event listeners for online/offline status
    const handleOnline = () => {
      setIsOffline(false);
      setShowAlert(false);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowAlert(true);
    };

    // Listen for custom events from service worker
    const handleAppOffline = () => {
      setIsOffline(true);
      setShowAlert(true);
    };

    const handleAppOnline = () => {
      setIsOffline(false);
      setShowAlert(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    document.addEventListener('appOffline', handleAppOffline);
    document.addEventListener('appOnline', handleAppOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('appOffline', handleAppOffline);
      document.removeEventListener('appOnline', handleAppOnline);
    };
  }, []);

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      {/* Persistent offline banner when offline */}
      {isOffline && (
        <Box
          sx={{
            bgcolor: 'warning.main',
            color: 'warning.contrastText',
            py: 1,
            px: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <WifiOffIcon sx={{ mr: 1 }} />
          <Typography variant="body1">
            You are offline. Some features may be limited.
          </Typography>
        </Box>
      )}

      {/* Temporary notification when going offline */}
      <Snackbar
        open={showAlert && isOffline}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity="warning"
          variant="filled"
          icon={<WifiOffIcon />}
          sx={{ width: '100%' }}
        >
          You are now offline. The app will continue to work with limited functionality.
        </Alert>
      </Snackbar>

      {/* Temporary notification when coming back online */}
      <Snackbar
        open={showAlert && !isOffline}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          You are back online. All features are now available.
        </Alert>
      </Snackbar>
    </>
  );
};

export default OfflineAlert;
