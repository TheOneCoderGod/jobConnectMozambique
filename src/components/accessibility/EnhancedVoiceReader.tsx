import React, { useEffect, useState, useRef } from 'react';
import { 
  Box, 
  IconButton, 
  Tooltip, 
  Paper,
  Typography,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Collapse,
  Button,
  Alert,
  SelectChangeEvent
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import SettingsIcon from '@mui/icons-material/Settings';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SpeedIcon from '@mui/icons-material/Speed';
import TranslateIcon from '@mui/icons-material/Translate';
import { useAppDispatch, useAppSelector } from '../../store';
import { 
  selectVoiceSettings,
  selectIsReading,
  selectCurrentText,
  toggleVoiceReading,
  setLanguage,
  setRate,
  setPitch,
  setVolume,
  toggleAutoRead,
  toggleHighlightText,
  toggleNumericNavigation,
  startReading,
  stopReading,
  pauseReading,
  resumeReading,
  SupportedLanguage
} from '../../store/slices/voiceReadingSlice';

interface EnhancedVoiceReaderProps {
  text: string;
  language?: SupportedLanguage;
  autoPlay?: boolean;
  showControls?: boolean;
}

const EnhancedVoiceReader: React.FC<EnhancedVoiceReaderProps> = ({ 
  text, 
  language, 
  autoPlay = false,
  showControls = true
}) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectVoiceSettings);
  const isReading = useAppSelector(selectIsReading);
  const currentText = useAppSelector(selectCurrentText);
  
  // Local state
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs
  const speechSynthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      speechSynthRef.current = window.speechSynthesis;
    } else {
      setError('Speech synthesis is not supported in this browser.');
    }
    
    return () => {
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel();
      }
    };
  }, []);
  
  // Handle language change
  useEffect(() => {
    if (language && language !== settings.language) {
      dispatch(setLanguage(language));
    }
  }, [language, settings.language, dispatch]);
  
  // Handle auto play
  useEffect(() => {
    if (autoPlay && settings.enabled && text && !isReading) {
      handlePlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, settings.enabled, text]);
  
  // Create and configure utterance
  const createUtterance = () => {
    if (!speechSynthRef.current) return null;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = settings.language;
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;
    
    utterance.onend = () => {
      dispatch(stopReading());
    };
    
    utterance.onerror = (event) => {
      setError(`Speech synthesis error: ${event.error}`);
      dispatch(stopReading());
    };
    
    return utterance;
  };
  
  // Play text
  const handlePlay = () => {
    if (!speechSynthRef.current) return;
    
    // If already reading, do nothing
    if (isReading && currentText === text) return;
    
    // If paused, resume
    if (!isReading && currentText === text) {
      speechSynthRef.current.resume();
      dispatch(resumeReading());
      return;
    }
    
    // Otherwise, start new reading
    speechSynthRef.current.cancel();
    const utterance = createUtterance();
    if (utterance) {
      utteranceRef.current = utterance;
      dispatch(startReading(text));
      speechSynthRef.current.speak(utterance);
    }
  };
  
  // Pause reading
  const handlePause = () => {
    if (!speechSynthRef.current || !isReading) return;
    
    speechSynthRef.current.pause();
    dispatch(pauseReading());
  };
  
  // Stop reading
  const handleStop = () => {
    if (!speechSynthRef.current) return;
    
    speechSynthRef.current.cancel();
    dispatch(stopReading());
  };
  
  // Toggle settings panel
  const handleToggleSettings = () => {
    setShowSettings(!showSettings);
  };
  
  // Handle language change
  const handleLanguageChange = (event: SelectChangeEvent<SupportedLanguage>) => {
    dispatch(setLanguage(event.target.value as SupportedLanguage));
  };
  
  // Handle rate change
  const handleRateChange = (_event: Event, value: number | number[]) => {
    dispatch(setRate(value as number));
  };
  
  // Handle pitch change
  const handlePitchChange = (_event: Event, value: number | number[]) => {
    dispatch(setPitch(value as number));
  };
  
  // Handle volume change
  const handleVolumeChange = (_event: Event, value: number | number[]) => {
    dispatch(setVolume(value as number));
  };
  
  // Get language name
  const getLanguageName = (lang: SupportedLanguage): string => {
    switch (lang) {
      case SupportedLanguage.ENGLISH:
        return 'English';
      case SupportedLanguage.PORTUGUESE:
        return 'Portuguese';
      case SupportedLanguage.CHANGANA:
        return 'Changana';
      case SupportedLanguage.MACUA:
        return 'Macua';
      default:
        return 'Unknown';
    }
  };
  
  if (!settings.enabled) {
    return null;
  }
  
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2, 
        mb: 3,
        borderRadius: 2,
        bgcolor: 'background.paper'
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: showSettings ? 2 : 0 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          <TranslateIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Voice Reading ({getLanguageName(settings.language)})
        </Typography>
        
        {showControls && (
          <Box>
            <Tooltip title="Play">
              <IconButton 
                color="primary" 
                onClick={handlePlay}
                disabled={!text || (isReading && currentText === text)}
              >
                <PlayArrowIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Pause">
              <IconButton 
                color="primary" 
                onClick={handlePause}
                disabled={!isReading || currentText !== text}
              >
                <PauseIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Stop">
              <IconButton 
                color="primary" 
                onClick={handleStop}
                disabled={!isReading && currentText !== text}
              >
                <StopIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Settings">
              <IconButton 
                color="primary" 
                onClick={handleToggleSettings}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
      
      <Collapse in={showSettings}>
        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="language-select-label">Language</InputLabel>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={settings.language}
              label="Language"
              onChange={handleLanguageChange}
            >
              <MenuItem value={SupportedLanguage.PORTUGUESE}>Portuguese</MenuItem>
              <MenuItem value={SupportedLanguage.ENGLISH}>English</MenuItem>
              <MenuItem value={SupportedLanguage.CHANGANA}>Changana</MenuItem>
              <MenuItem value={SupportedLanguage.MACUA}>Macua</MenuItem>
            </Select>
          </FormControl>
          
          <Box sx={{ mb: 2 }}>
            <Typography id="rate-slider" gutterBottom>
              <SpeedIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: 'small' }} />
              Speed: {settings.rate.toFixed(1)}x
            </Typography>
            <Slider
              value={settings.rate}
              onChange={handleRateChange}
              aria-labelledby="rate-slider"
              step={0.1}
              marks
              min={0.5}
              max={2}
              valueLabelDisplay="auto"
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography id="pitch-slider" gutterBottom>
              Pitch: {settings.pitch.toFixed(1)}
            </Typography>
            <Slider
              value={settings.pitch}
              onChange={handlePitchChange}
              aria-labelledby="pitch-slider"
              step={0.1}
              marks
              min={0.5}
              max={2}
              valueLabelDisplay="auto"
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography id="volume-slider" gutterBottom>
              <VolumeUpIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: 'small' }} />
              Volume: {Math.round(settings.volume * 100)}%
            </Typography>
            <Slider
              value={settings.volume}
              onChange={handleVolumeChange}
              aria-labelledby="volume-slider"
              step={0.1}
              marks
              min={0}
              max={1}
              valueLabelDisplay="auto"
            />
          </Box>
          
          <Box sx={{ mb: 1 }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={settings.autoRead} 
                  onChange={() => dispatch(toggleAutoRead())} 
                />
              }
              label="Auto-read content when page loads"
            />
          </Box>
          
          <Box sx={{ mb: 1 }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={settings.highlightText} 
                  onChange={() => dispatch(toggleHighlightText())} 
                />
              }
              label="Highlight text being read"
            />
          </Box>
          
          <Box>
            <FormControlLabel
              control={
                <Switch 
                  checked={settings.numericNavigation} 
                  onChange={() => dispatch(toggleNumericNavigation())} 
                />
              }
              label="Enable numeric navigation commands"
            />
          </Box>
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => dispatch(toggleVoiceReading())}
              color="error"
            >
              Disable Voice Reading
            </Button>
            
            <Button 
              variant="outlined" 
              size="small"
              onClick={handleToggleSettings}
            >
              Close Settings
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default EnhancedVoiceReader;
