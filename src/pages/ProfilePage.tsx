import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Grid,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Tab,
  Tabs,
  Alert
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MicIcon from '@mui/icons-material/Mic';
import TextToSpeech from '../components/accessibility/TextToSpeech';
import AudioRecorder from '../components/audio/AudioRecorder';
import AudioTranscription from '../components/audio/AudioTranscription';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  startTranscription,
  transcriptionComplete,
  transcriptionFailed,
  selectHasRecording,
  selectAudioBlob
} from '../store/slices/audioProfileSlice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const hasRecording = useAppSelector(selectHasRecording);
  const audioBlob = useAppSelector(selectAudioBlob);
  
  // Local state
  const [tabValue, setTabValue] = useState<number>(0);
  const [transcriptionRequested, setTranscriptionRequested] = useState<boolean>(false);
  
  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Handle transcription request
  const handleRequestTranscription = () => {
    if (!audioBlob) return;
    
    setTranscriptionRequested(true);
    dispatch(startTranscription());
    
    // Simulate transcription process (in a real app, this would call an API)
    setTimeout(() => {
      // Simulate successful transcription
      if (Math.random() > 0.2) { // 80% success rate for demo
        dispatch(transcriptionComplete(
          "Hello, my name is João Mabunda. I have 5 years of experience in construction work, " +
          "specializing in painting and general building maintenance. I also have 3 years of " +
          "experience as a security guard and 2 years working as a gardener. I am available " +
          "for full-time work in Maputo area, and I can start immediately. I have my own " +
          "transportation and basic tools. I am reliable and hardworking."
        ));
      } else {
        // Simulate failed transcription
        dispatch(transcriptionFailed("Could not transcribe audio. Please try recording again with clearer speech."));
      }
    }, 3000);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          3. My Profile
        </Typography>
        
        <Typography variant="body1" paragraph>
          Create and manage your job profile. Record an audio description of your skills for employers.
          This helps if you have difficulty writing or reading.
        </Typography>
        
        <TextToSpeech 
          text="On this page, you can create your job profile. If you have difficulty reading or writing, you can record your skills and experience using your voice. Employers can listen to your recording to learn about you."
          language="en-US"
        />
        
        <Grid container spacing={4}>
          <Grid>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    mx: 'auto', 
                    bgcolor: 'primary.main',
                    mb: 2
                  }}
                >
                  <PersonIcon sx={{ fontSize: 80 }} />
                </Avatar>
                
                <Typography variant="h6" gutterBottom>
                  João Mabunda
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Member since January 2025
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Chip 
                    label={hasRecording ? "Profile Complete" : "Profile Incomplete"} 
                    color={hasRecording ? "success" : "warning"} 
                    variant="outlined" 
                  />
                </Box>
              </CardContent>
            </Card>
            
            <Paper sx={{ mt: 3, p: 2 }}>
              <Typography variant="h6" gutterBottom>
                <LocationOnIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Location
              </Typography>
              <Typography variant="body1">
                Maputo, Mozambique
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                <WorkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Skills
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip label="Construction" />
                <Chip label="Driving" />
                <Chip label="Painting" />
                <Chip label="Gardening" />
                <Chip label="Security" />
              </Box>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Education
              </Typography>
              <Typography variant="body1">
                Secondary School Certificate
              </Typography>
            </Paper>
          </Grid>
          
          <Grid>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange} 
                  aria-label="profile tabs"
                  variant="fullWidth"
                >
                  <Tab 
                    icon={<MicIcon />} 
                    label="Audio Profile" 
                    id="profile-tab-0" 
                    aria-controls="profile-tabpanel-0" 
                  />
                  <Tab 
                    icon={<WorkIcon />} 
                    label="Work History" 
                    id="profile-tab-1" 
                    aria-controls="profile-tabpanel-1" 
                  />
                </Tabs>
              </Box>
              
              <TabPanel value={tabValue} index={0}>
                <Typography variant="body1" paragraph>
                  Record yourself describing your skills and experience. This helps employers hear directly from you.
                </Typography>
                
                {!transcriptionRequested && !hasRecording && (
                  <Alert severity="info" sx={{ mb: 3 }}>
                    Speak clearly about your skills, experience, and the type of work you're looking for.
                  </Alert>
                )}
                
                <AudioRecorder />
                
                <AudioTranscription onRequestTranscription={handleRequestTranscription} />
              </TabPanel>
              
              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom>
                  Work Experience
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Construction Worker" 
                      secondary="ABC Construction • Jan 2023 - Present" 
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="Security Guard" 
                      secondary="XYZ Security • Mar 2020 - Dec 2022" 
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="Gardener" 
                      secondary="Private Homes • Jan 2018 - Feb 2020" 
                    />
                  </ListItem>
                </List>
                
                <Button 
                  variant="outlined" 
                  color="primary" 
                  fullWidth 
                  sx={{ mt: 3 }}
                >
                  Add Work Experience
                </Button>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProfilePage;
