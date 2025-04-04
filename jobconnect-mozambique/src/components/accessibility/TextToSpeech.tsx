import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';

interface TextToSpeechProps {
  text: string;
  language?: string;
  label?: string;
  autoPlay?: boolean;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ 
  text, 
  language = 'pt-PT', 
  label = 'Read Aloud',
  autoPlay = false
}) => {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const speechSynthRef = React.useRef<SpeechSynthesisUtterance | null>(null);
  
  React.useEffect(() => {
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      speechSynthRef.current = new SpeechSynthesisUtterance();
      speechSynthRef.current.lang = language;
      speechSynthRef.current.text = text;
      speechSynthRef.current.rate = 0.9; // Slightly slower for better comprehension
      
      // Handle speech end event
      speechSynthRef.current.onend = () => {
        setIsPlaying(false);
      };
      
      // Auto-play if enabled
      if (autoPlay) {
        playText();
      }
    }
    
    // Cleanup
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [text, language, autoPlay]);
  
  const playText = () => {
    if ('speechSynthesis' in window && speechSynthRef.current) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Start new speech
      window.speechSynthesis.speak(speechSynthRef.current);
      setIsPlaying(true);
    }
  };
  
  const pauseText = () => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        } else {
          window.speechSynthesis.pause();
        }
      }
    }
  };
  
  const stopText = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };
  
  // If speech synthesis is not supported
  if (!('speechSynthesis' in window)) {
    return null;
  }
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
      {!isPlaying ? (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<VolumeUpIcon />}
          onClick={playText}
          aria-label={`Read aloud: ${text}`}
          sx={{ 
            borderRadius: 4,
            px: 2,
            py: 1
          }}
        >
          {label}
        </Button>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            Reading...
          </Typography>
          
          <Tooltip title="Pause/Resume">
            <IconButton 
              color="primary" 
              onClick={pauseText}
              aria-label="Pause or resume reading"
              size="small"
              sx={{ mr: 1 }}
            >
              <PauseIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Stop">
            <IconButton 
              color="error" 
              onClick={stopText}
              aria-label="Stop reading"
              size="small"
            >
              <StopIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default TextToSpeech;
