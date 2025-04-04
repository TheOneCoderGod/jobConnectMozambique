import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

// Define the audio profile state
interface AudioProfileState {
  isRecording: boolean;
  hasRecording: boolean;
  audioBlob: Blob | null;
  audioDuration: number;
  audioUrl: string | null;
  isPlaying: boolean;
  transcription: string | null;
  isTranscribing: boolean;
  error: string | null;
}

// Initial state
const initialState: AudioProfileState = {
  isRecording: false,
  hasRecording: false,
  audioBlob: null,
  audioDuration: 0,
  audioUrl: null,
  isPlaying: false,
  transcription: null,
  isTranscribing: false,
  error: null,
};

// Create the audio profile slice
const audioProfileSlice = createSlice({
  name: 'audioProfile',
  initialState,
  reducers: {
    startRecording: (state) => {
      state.isRecording = true;
      state.error = null;
    },
    stopRecording: (state, action: PayloadAction<{ blob: Blob; duration: number }>) => {
      state.isRecording = false;
      state.hasRecording = true;
      state.audioBlob = action.payload.blob;
      state.audioDuration = action.payload.duration;
      state.audioUrl = URL.createObjectURL(action.payload.blob);
    },
    startPlayback: (state) => {
      state.isPlaying = true;
    },
    stopPlayback: (state) => {
      state.isPlaying = false;
    },
    startTranscription: (state) => {
      state.isTranscribing = true;
      state.error = null;
    },
    transcriptionComplete: (state, action: PayloadAction<string>) => {
      state.isTranscribing = false;
      state.transcription = action.payload;
    },
    transcriptionFailed: (state, action: PayloadAction<string>) => {
      state.isTranscribing = false;
      state.error = action.payload;
    },
    clearRecording: (state) => {
      if (state.audioUrl) {
        URL.revokeObjectURL(state.audioUrl);
      }
      state.hasRecording = false;
      state.audioBlob = null;
      state.audioDuration = 0;
      state.audioUrl = null;
      state.transcription = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const {
  startRecording,
  stopRecording,
  startPlayback,
  stopPlayback,
  startTranscription,
  transcriptionComplete,
  transcriptionFailed,
  clearRecording,
  setError,
  clearError,
} = audioProfileSlice.actions;

// Export selectors
export const selectIsRecording = (state: RootState) => state.audioProfile.isRecording;
export const selectHasRecording = (state: RootState) => state.audioProfile.hasRecording;
export const selectAudioBlob = (state: RootState) => state.audioProfile.audioBlob;
export const selectAudioDuration = (state: RootState) => state.audioProfile.audioDuration;
export const selectAudioUrl = (state: RootState) => state.audioProfile.audioUrl;
export const selectIsPlaying = (state: RootState) => state.audioProfile.isPlaying;
export const selectTranscription = (state: RootState) => state.audioProfile.transcription;
export const selectIsTranscribing = (state: RootState) => state.audioProfile.isTranscribing;
export const selectError = (state: RootState) => state.audioProfile.error;

// Export reducer
export default audioProfileSlice.reducer;
