import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  TextField, 
  Button, 
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CallIcon from '@mui/icons-material/Call';
import CloseIcon from '@mui/icons-material/Close';
import SmsIcon from '@mui/icons-material/Sms';
import TextToSpeech from '../components/accessibility/TextToSpeech';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  selectCurrentMenu, 
  selectInputValue, 
  selectIsProcessing,
  selectCallInProgress,
  selectCallNumber,
  selectSmsContent,
  selectSmsNumber,
  setInputValue,
  processInput,
  goBack,
  resetToMain,
  endCall,
  clearSms
} from '../store/slices/ussdSlice';

const UssdSimulationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentMenu = useAppSelector(selectCurrentMenu);
  const inputValue = useAppSelector(selectInputValue);
  const isProcessing = useAppSelector(selectIsProcessing);
  const callInProgress = useAppSelector(selectCallInProgress);
  const callNumber = useAppSelector(selectCallNumber);
  const smsContent = useAppSelector(selectSmsContent);
  const smsNumber = useAppSelector(selectSmsNumber);
  
  // Local state for UI
  const [callDuration, setCallDuration] = useState<number>(0);
  
  // Handle call timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (callInProgress) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [callInProgress]);
  
  // Format call duration as MM:SS
  const formatCallDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle USSD input
  const handleUssdInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(event.target.value));
  };
  
  // Handle USSD submit
  const handleUssdSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(processInput());
  };
  
  // Handle back button
  const handleBack = () => {
    dispatch(goBack());
  };
  
  // Handle main menu button
  const handleMainMenu = () => {
    dispatch(resetToMain());
  };
  
  // Handle end call
  const handleEndCall = () => {
    dispatch(endCall());
  };
  
  // Handle clear SMS
  const handleClearSms = () => {
    dispatch(clearSms());
  };
  
  // Render USSD screen content
  const renderUssdContent = () => {
    if (!currentMenu) {
      return (
        <Typography variant="body1" gutterBottom>
          Loading...
        </Typography>
      );
    }
    
    return (
      <>
        <Typography variant="h6" align="center" gutterBottom>
          {currentMenu.title}
        </Typography>
        
        {currentMenu.options.map((option) => (
          <Typography key={option.key} variant="body1" gutterBottom>
            {option.key}. {option.text}
          </Typography>
        ))}
      </>
    );
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <PhoneIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          4. USSD Simulation
        </Typography>
        
        <Typography variant="body1" paragraph>
          This simulates how JobConnect works on basic phones without internet using USSD codes (*123#).
          Users with limited connectivity can access jobs and create profiles using this interface.
        </Typography>
        
        <TextToSpeech 
          text="This is a simulation of USSD access for JobConnect. USSD allows users to access the service without internet, using only basic phones. Navigate using number keys to find jobs, create profiles, and connect with employers."
          language="en-US"
        />
        
        <Grid container spacing={4}>
          <Grid >
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  How USSD Works:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="1. Dial *123# on your phone" 
                      secondary="No internet needed, works on any phone"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="2. Navigate using number keys" 
                      secondary="Press numbers to select options"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="3. Find jobs in your area" 
                      secondary="Browse jobs by location and category"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="4. Create profile via SMS" 
                      secondary="Send your details via text message"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="5. Get job alerts" 
                      secondary="Receive notifications about new jobs"
                    />
                  </ListItem>
                </List>
                
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CallIcon />}
                    size="large"
                    onClick={() => dispatch(setInputValue('2'))}
                  >
                    Try USSD Demo
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid >
            <Paper 
              sx={{ 
                p: 2, 
                bgcolor: '#000', 
                color: '#fff', 
                fontFamily: 'monospace',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ 
                bgcolor: '#222', 
                p: 2, 
                borderRadius: 1, 
                mb: 2,
                flexGrow: 1,
                minHeight: '300px',
                position: 'relative'
              }}>
                {isProcessing ? (
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: '100%'
                  }}>
                    <CircularProgress color="inherit" size={40} />
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      Processing...
                    </Typography>
                  </Box>
                ) : (
                  renderUssdContent()
                )}
              </Box>
              
              <Box component="form" onSubmit={handleUssdSubmit}>
                <Grid container spacing={1} alignItems="center">
                  <Grid>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter number..."
                      value={inputValue}
                      onChange={handleUssdInput}
                      disabled={isProcessing}
                      InputProps={{
                        startAdornment: <KeyboardIcon sx={{ mr: 1, color: '#aaa' }} />,
                        sx: { 
                          bgcolor: '#333', 
                          color: '#fff',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#555',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#777',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#0088ff',
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isProcessing || !inputValue}
                      sx={{ height: '56px' }}
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    disabled={isProcessing}
                    sx={{ 
                      color: '#fff', 
                      borderColor: '#555',
                      '&:hover': {
                        borderColor: '#fff',
                        bgcolor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    Back
                  </Button>
                  
                  <Button
                    variant="outlined"
                    onClick={handleMainMenu}
                    disabled={isProcessing}
                    sx={{ 
                      color: '#fff', 
                      borderColor: '#555',
                      '&:hover': {
                        borderColor: '#fff',
                        bgcolor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    Main Menu
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      
      {/* Phone Call Dialog */}
      <Dialog 
        open={callInProgress} 
        onClose={handleEndCall}
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: '100%',
            maxWidth: 360
          }
        }}
      >
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
          Call in Progress
          <IconButton
            aria-label="close"
            onClick={handleEndCall}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ py: 4, textAlign: 'center' }}>
          <PhoneIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {callNumber}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {formatCallDuration(callDuration)}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleEndCall}
            startIcon={<CloseIcon />}
          >
            End Call
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* SMS Dialog */}
      <Dialog 
        open={!!smsContent} 
        onClose={handleClearSms}
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: '100%',
            maxWidth: 360
          }
        }}
      >
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
          SMS Message
          <IconButton
            aria-label="close"
            onClick={handleClearSms}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SmsIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="body1">
              To: {smsNumber}
            </Typography>
          </Box>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f5f5f5' }}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {smsContent}
            </Typography>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleClearSms}
            startIcon={<SmsIcon />}
          >
            Send SMS
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UssdSimulationPage;
