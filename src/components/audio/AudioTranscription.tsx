import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider,
  Button,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TranslateIcon from '@mui/icons-material/Translate';
import { useAppSelector } from '../../store';
import { 
  selectHasRecording,
  selectTranscription,
  selectIsTranscribing,
  selectError
} from '../../store/slices/audioProfileSlice';

interface AudioTranscriptionProps {
  onRequestTranscription: () => void;
}

const AudioTranscription: React.FC<AudioTranscriptionProps> = ({ onRequestTranscription }) => {
  const hasRecording = useAppSelector(selectHasRecording);
  const transcription = useAppSelector(selectTranscription);
  const isTranscribing = useAppSelector(selectIsTranscribing);
  const error = useAppSelector(selectError);
  
  if (!hasRecording) {
    return null;
  }
  
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        bgcolor: 'background.paper',
        mt: 3
      }}
    >
      <Typography variant="h6" gutterBottom>
        Audio Transcription
      </Typography>
      
      <Divider sx={{ mb: 2 }} />
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {!transcription && !isTranscribing && (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="body1" paragraph>
            Convert your audio profile to text to make it searchable by employers.
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<TranslateIcon />}
            onClick={onRequestTranscription}
            sx={{ mt: 1 }}
          >
            Transcribe Audio
          </Button>
        </Box>
      )}
      
      {isTranscribing && (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1">
            Transcribing your audio...
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This may take a moment. Please wait.
          </Typography>
        </Box>
      )}
      
      {transcription && (
        <Box>
          <Typography variant="body1" paragraph>
            Your audio has been transcribed:
          </Typography>
          
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 2, 
              bgcolor: 'background.default',
              borderRadius: 1
            }}
          >
            <Typography variant="body1">
              {transcription}
            </Typography>
          </Paper>
          
          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Tips for improving your profile</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                Based on your recording, here are some suggestions to improve your profile:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body2">
                    Mention specific skills you have (e.g., carpentry, driving, cooking)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Include your years of experience in each skill
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Mention your preferred work locations
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Describe your availability (full-time, part-time, weekends)
                  </Typography>
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
    </Paper>
  );
};

export default AudioTranscription;
