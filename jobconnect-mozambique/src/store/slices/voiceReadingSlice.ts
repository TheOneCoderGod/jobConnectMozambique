import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

// Define supported languages
export enum SupportedLanguage {
  ENGLISH = 'en-US',
  PORTUGUESE = 'pt-PT',
  CHANGANA = 'changana', // Custom language code for Changana
  MACUA = 'macua' // Custom language code for Macua
}

// Define voice settings
export interface VoiceSettings {
  enabled: boolean;
  language: SupportedLanguage;
  rate: number; // 0.5 to 2.0
  pitch: number; // 0.5 to 2.0
  volume: number; // 0 to 1.0
  autoRead: boolean; // Auto-read content when page loads
  highlightText: boolean; // Highlight text being read
  numericNavigation: boolean; // Enable numeric navigation commands
}

// Define voice reading state
interface VoiceReadingState {
  settings: VoiceSettings;
  isReading: boolean;
  currentText: string;
  availableVoices: string[];
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: VoiceReadingState = {
  settings: {
    enabled: true,
    language: SupportedLanguage.PORTUGUESE,
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    autoRead: false,
    highlightText: true,
    numericNavigation: true
  },
  isReading: false,
  currentText: '',
  availableVoices: [],
  isLoading: false,
  error: null
};

// Create the voice reading slice
const voiceReadingSlice = createSlice({
  name: 'voiceReading',
  initialState,
  reducers: {
    toggleVoiceReading: (state) => {
      state.settings.enabled = !state.settings.enabled;
      if (!state.settings.enabled) {
        state.isReading = false;
        state.currentText = '';
      }
    },
    setLanguage: (state, action: PayloadAction<SupportedLanguage>) => {
      state.settings.language = action.payload;
    },
    setRate: (state, action: PayloadAction<number>) => {
      state.settings.rate = action.payload;
    },
    setPitch: (state, action: PayloadAction<number>) => {
      state.settings.pitch = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.settings.volume = action.payload;
    },
    toggleAutoRead: (state) => {
      state.settings.autoRead = !state.settings.autoRead;
    },
    toggleHighlightText: (state) => {
      state.settings.highlightText = !state.settings.highlightText;
    },
    toggleNumericNavigation: (state) => {
      state.settings.numericNavigation = !state.settings.numericNavigation;
    },
    startReading: (state, action: PayloadAction<string>) => {
      state.isReading = true;
      state.currentText = action.payload;
    },
    stopReading: (state) => {
      state.isReading = false;
      state.currentText = '';
    },
    pauseReading: (state) => {
      state.isReading = false;
    },
    resumeReading: (state) => {
      state.isReading = true;
    },
    setAvailableVoices: (state, action: PayloadAction<string[]>) => {
      state.availableVoices = action.payload;
    },
    loadVoicesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loadVoicesSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    loadVoicesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetSettings: (state) => {
      state.settings = initialState.settings;
    }
  }
});

// Export actions
export const {
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
  setAvailableVoices,
  loadVoicesStart,
  loadVoicesSuccess,
  loadVoicesFailure,
  resetSettings
} = voiceReadingSlice.actions;

// Export selectors
export const selectVoiceSettings = (state: RootState) => state.voiceReading.settings;
export const selectIsReading = (state: RootState) => state.voiceReading.isReading;
export const selectCurrentText = (state: RootState) => state.voiceReading.currentText;
export const selectAvailableVoices = (state: RootState) => state.voiceReading.availableVoices;
export const selectVoiceReadingLoading = (state: RootState) => state.voiceReading.isLoading;
export const selectVoiceReadingError = (state: RootState) => state.voiceReading.error;

// Export reducer
export default voiceReadingSlice.reducer;
