import React, { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  CircularProgress, 
  Alert,
  IconButton,
  Paper,
  Slider,
  Stack
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../store';
import { 
  startRecording, 
  stopRecording, 
  startPlayback, 
  stopPlayback, 
  clearRecording,
  setError,
  selectIsRecording,
  selectHasRecording,
  selectAudioUrl,
  selectIsPlaying,
  selectAudioDuration,
  selectError
} from '../../store/slices/audioProfileSlice';

const AudioRecorder: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Redux state
  const isRecording = useAppSelector(selectIsRecording);
  const hasRecording = useAppSelector(selectHasRecording);
  const audioUrl = useAppSelector(selectAudioUrl);
  const isPlaying = useAppSelector(selectIsPlaying);
  const audioDuration = useAppSelector(selectAudioDuration);
  const error = useAppSelector(selectError);
  
  // Local state
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);
  
  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    
    // Set up audio events
    if (audioRef.current) {
      audioRef.current.addEventListener('play', () => {
        dispatch(startPlayback());
      });
      
      audioRef.current.addEventListener('pause', () => {
        dispatch(stopPlayback());
      });
      
      audioRef.current.addEventListener('ended', () => {
        dispatch(stopPlayback());
        setPlaybackTime(0);
        setPlaybackProgress(0);
      });
      
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setPlaybackTime(audioRef.current.currentTime);
          setPlaybackProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
      });
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [dispatch]);
  
  // Update audio source when URL changes
  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
    }
  }, [audioUrl]);
  
  // Handle recording timer
  useEffect(() => {
    if (isRecording) {
      setRecordingTime(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }
    
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Start recording
  const handleStartRecording = async () => {
    try {
      audioChunksRef.current = [];
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      });
      
      mediaRecorderRef.current.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        dispatch(stopRecording({ blob: audioBlob, duration: recordingTime }));
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      });
      
      mediaRecorderRef.current.start();
      dispatch(startRecording());
    } catch (err) {
      console.error('Error starting recording:', err);
      dispatch(setError('Could not access microphone. Please check permissions.'));
    }
  };
  
  // Stop recording
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };
  
  // Play recording
  const handlePlayRecording = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(err => {
        console.error('Error playing audio:', err);
        dispatch(setError('Could not play recording.'));
      });
    }
  };
  
  // Pause recording
  const handlePauseRecording = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
    }
  };
  
  // Delete recording
  const handleDeleteRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    dispatch(clearRecording());
    setPlaybackTime(0);
    setPlaybackProgress(0);
  };
  
  // Handle slider change
  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    const value = newValue as number;
    if (audioRef.current && audioDuration > 0) {
      const newTime = (value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setPlaybackTime(newTime);
      setPlaybackProgress(value);
    }
  };
  
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant="h6" gutterBottom align="center">
        Audio Profile Recording
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(setError(''))}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Recording UI */}
        {!hasRecording ? (
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Box 
              sx={{ 
                width: 120, 
                height: 120, 
                borderRadius: '50%', 
                bgcolor: isRecording ? 'error.main' : 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                mx: 'auto',
                transition: 'all 0.3s ease',
                transform: isRecording ? 'scale(1.1)' : 'scale(1)',
                boxShadow: isRecording ? 4 : 2
              }}
            >
              {isRecording ? (
                <StopIcon sx={{ fontSize: 60, color: 'white' }} />
              ) : (
                <MicIcon sx={{ fontSize: 60, color: 'white' }} />
              )}
            </Box>
            
            <Typography variant="h5" gutterBottom>
              {isRecording ? formatTime(recordingTime) : 'Ready to Record'}
            </Typography>
            
            <Button
              variant="contained"
              color={isRecording ? 'error' : 'primary'}
              size="large"
              startIcon={isRecording ? <StopIcon /> : <MicIcon />}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              sx={{ mt: 2, px: 4 }}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
            
            {isRecording && (
              <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                Recording in progress... Speak clearly about your skills and experience.
              </Typography>
            )}
          </Box>
        ) : (
          /* Playback UI */
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Typography variant="body1" gutterBottom>
              Recording Complete - {formatTime(audioDuration)}
            </Typography>
            
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
              <Typography variant="body2">
                {formatTime(playbackTime)}
              </Typography>
              <Slider
                value={playbackProgress}
                onChange={handleSliderChange}
                aria-label="Playback progress"
                sx={{ mx: 2 }}
              />
              <Typography variant="body2">
                {formatTime(audioDuration)}
              </Typography>
            </Stack>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              {isPlaying ? (
                <IconButton 
                  color="primary" 
                  aria-label="pause" 
                  onClick={handlePauseRecording}
                  sx={{ 
                    border: '1px solid',
                    borderColor: 'primary.main',
                    p: 2
                  }}
                >
                  <PauseIcon fontSize="large" />
                </IconButton>
              ) : (
                <IconButton 
                  color="primary" 
                  aria-label="play" 
                  onClick={handlePlayRecording}
                  sx={{ 
                    border: '1px solid',
                    borderColor: 'primary.main',
                    p: 2
                  }}
                >
                  <PlayArrowIcon fontSize="large" />
                </IconButton>
              )}
              
              <IconButton 
                color="error" 
                aria-label="delete recording" 
                onClick={handleDeleteRecording}
                sx={{ 
                  border: '1px solid',
                  borderColor: 'error.main',
                  p: 2
                }}
              >
                <DeleteIcon fontSize="large" />
              </IconButton>
            </Box>
            
            <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
              Listen to your recording to make sure it's clear. You can re-record if needed.
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default AudioRecorder;
