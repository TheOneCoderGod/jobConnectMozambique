import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Import reducers
import ussdReducer from './slices/ussdSlice';
import audioProfileReducer from './slices/audioProfileSlice';
import gigsReducer from './slices/gigsSlice';
import whatsAppReducer from './slices/whatsAppSlice';
import voiceReadingReducer from './slices/voiceReadingSlice';
import offlineMapReducer from './slices/offlineMapSlice';
// import userReducer from './slices/userSlice';
// import jobsReducer from './slices/jobsSlice';

export const store = configureStore({
  reducer: {
    ussd: ussdReducer,
    audioProfile: audioProfileReducer,
    gigs: gigsReducer,
    whatsApp: whatsAppReducer,
    voiceReading: voiceReadingReducer,
    offlineMap: offlineMapReducer,
    // Add other reducers here when created
    // user: userReducer,
    // jobs: jobsReducer,
  },
  // Add middleware for offline support
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in specific action types
        ignoredActions: [
          'audio/recordStart', 
          'audio/recordStop',
          'audioProfile/stopRecording'
        ],
        // Ignore specific field paths for non-serializable values
        ignoredPaths: ['audioProfile.audioBlob']
      },
    }),
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
