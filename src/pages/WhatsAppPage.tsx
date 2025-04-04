import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid,
  Paper,
  Divider,
  Button,
  Alert
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TextToSpeech from '../components/accessibility/TextToSpeech';
import WhatsAppConnection from '../components/whatsapp/WhatsAppConnection';
import WhatsAppNotifications from '../components/whatsapp/WhatsAppNotifications';
import { useAppSelector } from '../store';
import { selectWhatsAppConnection } from '../store/slices/whatsAppSlice';

const WhatsAppPage: React.FC = () => {
  const { isConnected, isVerified } = useAppSelector(selectWhatsAppConnection);
  
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <WhatsAppIcon sx={{ mr: 1, verticalAlign: 'middle', color: '#25D366' }} />
          4. WhatsApp Integration
        </Typography>
        
        <Typography variant="body1" paragraph>
          Connect your WhatsApp account to receive job notifications and updates. This allows you to use JobConnect
          even when you don't have internet access or data for the app.
        </Typography>
        
        <TextToSpeech 
          text="On this page, you can connect your WhatsApp account to JobConnect. This will allow you to receive job notifications and updates through WhatsApp, even when you don't have internet access for the app. You can also respond to job opportunities directly through WhatsApp messages."
          language="en-US"
        />
        
        <Grid container spacing={4}>
          <Grid >
            <WhatsAppConnection />
          </Grid>
          
          {isConnected && isVerified && (
            <Grid >
              <WhatsAppNotifications />
            </Grid>
          )}
          
          <Grid >
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                How WhatsApp Integration Works
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="body1" paragraph>
                JobConnect uses WhatsApp to help you find work even when you don't have internet access or data for the app.
                Here's how it works:
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  1. Job Notifications
                </Typography>
                <Typography variant="body1" paragraph>
                  Receive alerts about new job opportunities that match your skills and location directly on WhatsApp.
                  Reply to the message to express interest in the job.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  2. Application Updates
                </Typography>
                <Typography variant="body1" paragraph>
                  Get updates about your job applications, including interview invitations and hiring decisions.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  3. USSD-like Commands
                </Typography>
                <Typography variant="body1" paragraph>
                  Use simple commands in WhatsApp messages to search for jobs, update your profile, or check application status.
                  For example, send "JOBS MAPUTO" to see jobs in Maputo.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  4. Voice Notes
                </Typography>
                <Typography variant="body1">
                  Send voice notes to apply for jobs or update your profile if you have difficulty typing.
                </Typography>
              </Box>
              
              <Alert severity="info">
                WhatsApp integration works with any phone that has WhatsApp installed, even basic feature phones.
                Standard WhatsApp message rates from your carrier may apply.
              </Alert>
            </Paper>
          </Grid>
          
          <Grid>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                WhatsApp Commands
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="body1" paragraph>
                You can use these commands in WhatsApp messages to interact with JobConnect:
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  JOBS
                </Typography>
                <Typography variant="body2" paragraph>
                  Lists the latest job opportunities
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  JOBS [LOCATION]
                </Typography>
                <Typography variant="body2" paragraph>
                  Lists jobs in a specific location (e.g., JOBS MAPUTO)
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  INFO [JOB NUMBER]
                </Typography>
                <Typography variant="body2" paragraph>
                  Gets details about a specific job (e.g., INFO 12)
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  APPLY [JOB NUMBER]
                </Typography>
                <Typography variant="body2" paragraph>
                  Applies for a specific job (e.g., APPLY 12)
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  STATUS
                </Typography>
                <Typography variant="body2" paragraph>
                  Checks the status of your job applications
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  HELP
                </Typography>
                <Typography variant="body2">
                  Lists all available commands
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default WhatsAppPage;
