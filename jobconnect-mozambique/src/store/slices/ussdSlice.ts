import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

// Define the USSD menu structure
export interface UssdMenuItem {
  id: string;
  title: string;
  options: {
    key: string;
    text: string;
    nextScreen?: string;
    action?: string;
  }[];
}

// Define the USSD state
interface UssdState {
  currentScreen: string;
  history: string[];
  menuItems: Record<string, UssdMenuItem>;
  inputValue: string;
  isProcessing: boolean;
  callInProgress: boolean;
  callNumber: string | null;
  smsContent: string | null;
  smsNumber: string | null;
}

// Initial USSD menu structure
const initialMenuItems: Record<string, UssdMenuItem> = {
  main: {
    id: 'main',
    title: 'JobConnect Mozambique',
    options: [
      { key: '1', text: 'Find Jobs', nextScreen: 'jobs' },
      { key: '2', text: 'My Profile', nextScreen: 'profile' },
      { key: '3', text: 'Gigs Near Me', nextScreen: 'gigs' },
      { key: '4', text: 'Help', nextScreen: 'help' },
    ],
  },
  jobs: {
    id: 'jobs',
    title: 'Find Jobs by Location',
    options: [
      { key: '1', text: 'Maputo', nextScreen: 'jobs-maputo' },
      { key: '2', text: 'Beira', nextScreen: 'jobs-beira' },
      { key: '3', text: 'Nampula', nextScreen: 'jobs-nampula' },
      { key: '0', text: 'Back', nextScreen: 'main' },
    ],
  },
  'jobs-maputo': {
    id: 'jobs-maputo',
    title: 'Jobs in Maputo',
    options: [
      { key: '1', text: 'Construction Worker (150 MZN/hr)', nextScreen: 'job-details', action: 'view-job-1' },
      { key: '2', text: 'Security Guard (120 MZN/hr)', nextScreen: 'job-details', action: 'view-job-2' },
      { key: '3', text: 'Shop Assistant (100 MZN/hr)', nextScreen: 'job-details', action: 'view-job-3' },
      { key: '0', text: 'Back', nextScreen: 'jobs' },
    ],
  },
  'jobs-beira': {
    id: 'jobs-beira',
    title: 'Jobs in Beira',
    options: [
      { key: '1', text: 'Port Worker (180 MZN/hr)', nextScreen: 'job-details', action: 'view-job-4' },
      { key: '2', text: 'Warehouse Staff (130 MZN/hr)', nextScreen: 'job-details', action: 'view-job-5' },
      { key: '3', text: 'Driver (140 MZN/hr)', nextScreen: 'job-details', action: 'view-job-6' },
      { key: '0', text: 'Back', nextScreen: 'jobs' },
    ],
  },
  'jobs-nampula': {
    id: 'jobs-nampula',
    title: 'Jobs in Nampula',
    options: [
      { key: '1', text: 'Farm Worker (110 MZN/hr)', nextScreen: 'job-details', action: 'view-job-7' },
      { key: '2', text: 'Shop Assistant (100 MZN/hr)', nextScreen: 'job-details', action: 'view-job-8' },
      { key: '3', text: 'Construction Helper (140 MZN/hr)', nextScreen: 'job-details', action: 'view-job-9' },
      { key: '0', text: 'Back', nextScreen: 'jobs' },
    ],
  },
  'job-details': {
    id: 'job-details',
    title: 'Job Details',
    options: [
      { key: '1', text: 'Apply for this job', action: 'apply-job' },
      { key: '2', text: 'Call employer', action: 'call-employer' },
      { key: '3', text: 'Save job for later', action: 'save-job' },
      { key: '0', text: 'Back', nextScreen: 'jobs' },
    ],
  },
  profile: {
    id: 'profile',
    title: 'My Profile',
    options: [
      { key: '1', text: 'Create Profile via SMS', nextScreen: 'profile-create' },
      { key: '2', text: 'View My Profile', nextScreen: 'profile-view' },
      { key: '3', text: 'Update Skills', nextScreen: 'profile-skills' },
      { key: '0', text: 'Back', nextScreen: 'main' },
    ],
  },
  'profile-create': {
    id: 'profile-create',
    title: 'Create Profile via SMS',
    options: [
      { key: '1', text: 'Send SMS now', action: 'send-profile-sms' },
      { key: '2', text: 'SMS instructions', nextScreen: 'profile-sms-instructions' },
      { key: '0', text: 'Back', nextScreen: 'profile' },
    ],
  },
  'profile-sms-instructions': {
    id: 'profile-sms-instructions',
    title: 'SMS Instructions',
    options: [
      { key: '1', text: 'Send example SMS', action: 'send-example-sms' },
      { key: '0', text: 'Back', nextScreen: 'profile-create' },
    ],
  },
  'profile-view': {
    id: 'profile-view',
    title: 'My Profile',
    options: [
      { key: '1', text: 'Personal Details', nextScreen: 'profile-details' },
      { key: '2', text: 'Work History', nextScreen: 'profile-work' },
      { key: '3', text: 'Skills', nextScreen: 'profile-skills' },
      { key: '0', text: 'Back', nextScreen: 'profile' },
    ],
  },
  gigs: {
    id: 'gigs',
    title: 'Gigs Near Me',
    options: [
      { key: '1', text: 'House Cleaning (4 hours)', nextScreen: 'gig-details', action: 'view-gig-1' },
      { key: '2', text: 'Garden Work (3 hours)', nextScreen: 'gig-details', action: 'view-gig-2' },
      { key: '3', text: 'Moving Help (5 hours)', nextScreen: 'gig-details', action: 'view-gig-3' },
      { key: '0', text: 'Back', nextScreen: 'main' },
    ],
  },
  'gig-details': {
    id: 'gig-details',
    title: 'Gig Details',
    options: [
      { key: '1', text: 'Apply for this gig', action: 'apply-gig' },
      { key: '2', text: 'Call employer', action: 'call-employer' },
      { key: '0', text: 'Back', nextScreen: 'gigs' },
    ],
  },
  help: {
    id: 'help',
    title: 'Help & Support',
    options: [
      { key: '1', text: 'Call Support', action: 'call-support' },
      { key: '2', text: 'How to Use', nextScreen: 'help-how-to' },
      { key: '3', text: 'About JobConnect', nextScreen: 'help-about' },
      { key: '0', text: 'Back', nextScreen: 'main' },
    ],
  },
  'help-how-to': {
    id: 'help-how-to',
    title: 'How to Use JobConnect',
    options: [
      { key: '1', text: 'Finding Jobs', nextScreen: 'help-finding-jobs' },
      { key: '2', text: 'Creating Profile', nextScreen: 'help-creating-profile' },
      { key: '3', text: 'Applying for Jobs', nextScreen: 'help-applying' },
      { key: '0', text: 'Back', nextScreen: 'help' },
    ],
  },
};

// Initial state
const initialState: UssdState = {
  currentScreen: 'main',
  history: [],
  menuItems: initialMenuItems,
  inputValue: '',
  isProcessing: false,
  callInProgress: false,
  callNumber: null,
  smsContent: null,
  smsNumber: null,
};

// Create the USSD slice
const ussdSlice = createSlice({
  name: 'ussd',
  initialState,
  reducers: {
    setCurrentScreen: (state, action: PayloadAction<string>) => {
      // Add current screen to history before changing
      if (state.currentScreen !== action.payload) {
        state.history.push(state.currentScreen);
      }
      state.currentScreen = action.payload;
      state.inputValue = '';
    },
    goBack: (state) => {
      if (state.history.length > 0) {
        // Pop the last screen from history
        const previousScreen = state.history.pop();
        if (previousScreen) {
          state.currentScreen = previousScreen;
        }
      } else {
        // If no history, go to main
        state.currentScreen = 'main';
      }
      state.inputValue = '';
    },
    resetToMain: (state) => {
      state.currentScreen = 'main';
      state.history = [];
      state.inputValue = '';
      state.isProcessing = false;
      state.callInProgress = false;
      state.callNumber = null;
      state.smsContent = null;
      state.smsNumber = null;
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    processInput: (state) => {
      const currentMenu = state.menuItems[state.currentScreen];
      if (!currentMenu) return;

      // Find the option that matches the input
      const selectedOption = currentMenu.options.find(
        (option) => option.key === state.inputValue
      );

      if (selectedOption) {
        // If there's a next screen, navigate to it
        if (selectedOption.nextScreen) {
          state.history.push(state.currentScreen);
          state.currentScreen = selectedOption.nextScreen;
        }

        // If there's an action, process it
        if (selectedOption.action) {
          state.isProcessing = true;
          // Actions would be handled by thunks in a real implementation
          // Here we just simulate some actions
          if (selectedOption.action === 'call-employer') {
            state.callInProgress = true;
            state.callNumber = '+258 84 123 4567'; // Example number
          } else if (selectedOption.action === 'call-support') {
            state.callInProgress = true;
            state.callNumber = '+258 84 000 0000'; // Support number
          } else if (selectedOption.action === 'send-profile-sms') {
            state.smsContent = 'NAME [your name] SKILLS [your skills] LOCATION [your location]';
            state.smsNumber = '12345';
          }
        }
      }

      // Clear input after processing
      state.inputValue = '';
    },
    endCall: (state) => {
      state.callInProgress = false;
      state.callNumber = null;
    },
    clearSms: (state) => {
      state.smsContent = null;
      state.smsNumber = null;
    },
    setIsProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
  },
});

// Export actions
export const {
  setCurrentScreen,
  goBack,
  resetToMain,
  setInputValue,
  processInput,
  endCall,
  clearSms,
  setIsProcessing,
} = ussdSlice.actions;

// Export selectors
export const selectCurrentScreen = (state: RootState) => state.ussd.currentScreen;
export const selectCurrentMenu = (state: RootState) => 
  state.ussd.menuItems[state.ussd.currentScreen];
export const selectInputValue = (state: RootState) => state.ussd.inputValue;
export const selectIsProcessing = (state: RootState) => state.ussd.isProcessing;
export const selectCallInProgress = (state: RootState) => state.ussd.callInProgress;
export const selectCallNumber = (state: RootState) => state.ussd.callNumber;
export const selectSmsContent = (state: RootState) => state.ussd.smsContent;
export const selectSmsNumber = (state: RootState) => state.ussd.smsNumber;

// Export reducer
export default ussdSlice.reducer;
