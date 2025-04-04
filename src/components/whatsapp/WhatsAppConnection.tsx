import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Switch
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch, useAppSelector } from '../../store';
import { 
  connectWhatsApp,
  connectWhatsAppSuccess,
  connectWhatsAppFailure,
  verifyWhatsApp,
  verifyWhatsAppSuccess,
  verifyWhatsAppFailure,
  disconnectWhatsApp,
  selectWhatsAppConnection,
  selectWhatsAppLoading,
  selectWhatsAppError
} from '../../store/slices/whatsAppSlice';

const WhatsAppConnection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isConnected, phoneNumber, isVerified } = useAppSelector(selectWhatsAppConnection);
  const isLoading = useAppSelector(selectWhatsAppLoading);
  const error = useAppSelector(selectWhatsAppError);
  
  // Local state
  const [open, setOpen] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [phone, setPhone] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [jobAlerts, setJobAlerts] = useState<boolean>(true);
  const [applicationUpdates, setApplicationUpdates] = useState<boolean>(true);
  const [generalAnnouncements, setGeneralAnnouncements] = useState<boolean>(true);
  
  // Steps for the connection process
  const steps = ['Enter Phone Number', 'Verify Code', 'Notification Preferences'];
  
  // Handle dialog open
  const handleOpen = () => {
    setOpen(true);
    setActiveStep(0);
    setPhone('');
    setVerificationCode('');
  };
  
  // Handle dialog close
  const handleClose = () => {
    setOpen(false);
  };
  
  // Handle phone number submit
  const handlePhoneSubmit = () => {
    dispatch(connectWhatsApp());
    
    // Simulate API call to send verification code
    setTimeout(() => {
      if (phone && phone.length >= 9) {
        dispatch(connectWhatsAppSuccess(phone));
        setActiveStep(1);
      } else {
        dispatch(connectWhatsAppFailure('Please enter a valid phone number'));
      }
    }, 1500);
  };
  
  // Handle verification code submit
  const handleVerificationSubmit = () => {
    dispatch(verifyWhatsApp());
    
    // Simulate API call to verify code
    setTimeout(() => {
      if (verificationCode && verificationCode.length === 6) {
        dispatch(verifyWhatsAppSuccess());
        setActiveStep(2);
      } else {
        dispatch(verifyWhatsAppFailure('Invalid verification code'));
      }
    }, 1500);
  };
  
  // Handle preferences submit
  const handlePreferencesSubmit = () => {
    // In a real app, we would save these preferences to the backend
    handleClose();
  };
  
  // Handle disconnect
  const handleDisconnect = () => {
    dispatch(disconnectWhatsApp());
  };
  
  // Render connection button or status
  const renderConnectionStatus = () => {
    if (isConnected && isVerified) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CheckCircleIcon color="success" sx={{ mr: 1 }} />
          <Typography variant="body1">
            Connected to WhatsApp: {phoneNumber}
          </Typography>
        </Box>
      );
    }
    
    return (
      <Button 
        variant="contained" 
        startIcon={<WhatsAppIcon />}
        onClick={handleOpen}
        sx={{ 
          bgcolor: '#25D366',
          '&:hover': {
            bgcolor: '#128C7E'
          },
          mb: 2
        }}
      >
        Connect WhatsApp
      </Button>
    );
  };
  
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <WhatsAppIcon sx={{ fontSize: 40, color: '#25D366', mr: 2 }} />
        <Typography variant="h6">
          WhatsApp Integration
        </Typography>
      </Box>
      
      <Typography variant="body1" paragraph>
        Connect your WhatsApp account to receive job notifications, application updates, and interview reminders.
        This allows you to use JobConnect even when you don't have internet access or data.
      </Typography>
      
      {renderConnectionStatus()}
      
      {isConnected && isVerified && (
        <Button 
          variant="outlined" 
          color="error" 
          onClick={handleDisconnect}
          size="small"
        >
          Disconnect WhatsApp
        </Button>
      )}
      
      {/* Connection Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WhatsAppIcon sx={{ color: '#25D366', mr: 1 }} />
            Connect WhatsApp
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4, mt: 2 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {activeStep === 0 && (
            <>
              <Typography variant="body1" paragraph>
                Enter your WhatsApp phone number to receive job notifications and updates.
              </Typography>
              
              <TextField
                fullWidth
                label="WhatsApp Phone Number"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+258 84 123 4567"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="body2" color="text.secondary">
                We'll send a verification code to this number via WhatsApp.
              </Typography>
            </>
          )}
          
          {activeStep === 1 && (
            <>
              <Typography variant="body1" paragraph>
                Enter the 6-digit verification code sent to your WhatsApp number.
              </Typography>
              
              <TextField
                fullWidth
                label="Verification Code"
                variant="outlined"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="123456"
                inputProps={{ maxLength: 6 }}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="body2" color="text.secondary">
                Didn't receive the code? Check your WhatsApp messages or try again in a few minutes.
              </Typography>
            </>
          )}
          
          {activeStep === 2 && (
            <>
              <Typography variant="body1" paragraph>
                Choose which types of notifications you want to receive on WhatsApp.
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={jobAlerts} 
                    onChange={(e) => setJobAlerts(e.target.checked)} 
                    color="primary"
                  />
                }
                label="Job Alerts"
              />
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Receive notifications when new jobs matching your skills are posted.
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={applicationUpdates} 
                    onChange={(e) => setApplicationUpdates(e.target.checked)} 
                    color="primary"
                  />
                }
                label="Application Updates"
              />
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Receive updates about your job applications and interview invitations.
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={generalAnnouncements} 
                    onChange={(e) => setGeneralAnnouncements(e.target.checked)} 
                    color="primary"
                  />
                }
                label="General Announcements"
              />
              
              <Typography variant="body2" color="text.secondary">
                Receive general announcements and tips about using JobConnect.
              </Typography>
            </>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          
          {activeStep === 0 && (
            <Button 
              onClick={handlePhoneSubmit}
              variant="contained"
              disabled={!phone || isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? 'Sending...' : 'Send Code'}
            </Button>
          )}
          
          {activeStep === 1 && (
            <Button 
              onClick={handleVerificationSubmit}
              variant="contained"
              disabled={!verificationCode || verificationCode.length !== 6 || isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </Button>
          )}
          
          {activeStep === 2 && (
            <Button 
              onClick={handlePreferencesSubmit}
              variant="contained"
              color="success"
            >
              Complete Setup
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default WhatsAppConnection;
