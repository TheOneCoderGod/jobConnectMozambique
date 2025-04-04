import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

// Define WhatsApp notification types
export enum NotificationType {
  JOB_ALERT = 'job_alert',
  APPLICATION_STATUS = 'application_status',
  INTERVIEW_REMINDER = 'interview_reminder',
  PAYMENT_CONFIRMATION = 'payment_confirmation',
  GENERAL_ANNOUNCEMENT = 'general_announcement'
}

// Define WhatsApp message interface
export interface WhatsAppMessage {
  id: string;
  type: NotificationType;
  title: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  requiresAction: boolean;
  actionUrl?: string;
  jobId?: string;
}

// Define WhatsApp state
interface WhatsAppState {
  isConnected: boolean;
  phoneNumber: string | null;
  isVerified: boolean;
  messages: WhatsAppMessage[];
  notificationsEnabled: boolean;
  isLoading: boolean;
  error: string | null;
}

// Sample messages data
const sampleMessages: WhatsAppMessage[] = [
  {
    id: '1',
    type: NotificationType.JOB_ALERT,
    title: 'New Job Opportunity',
    content: 'A new construction job is available in Maputo. Pays 150 MZN/hr. Reply "INFO 1" for more details.',
    timestamp: '2025-04-04T08:30:00Z',
    isRead: false,
    requiresAction: true,
    jobId: '1'
  },
  {
    id: '2',
    type: NotificationType.APPLICATION_STATUS,
    title: 'Application Update',
    content: 'Your application for the Security Guard position has been received. The employer will contact you soon.',
    timestamp: '2025-04-03T14:15:00Z',
    isRead: true,
    requiresAction: false
  },
  {
    id: '3',
    type: NotificationType.INTERVIEW_REMINDER,
    title: 'Interview Reminder',
    content: 'Reminder: You have an interview tomorrow at 10:00 AM with ABC Construction. Location: Av. 24 de Julho, Maputo.',
    timestamp: '2025-04-02T09:45:00Z',
    isRead: true,
    requiresAction: false
  },
  {
    id: '4',
    type: NotificationType.GENERAL_ANNOUNCEMENT,
    title: 'JobConnect Update',
    content: 'JobConnect now supports audio profiles! Record your skills to stand out to employers. Open the app to try it now.',
    timestamp: '2025-04-01T11:20:00Z',
    isRead: false,
    requiresAction: true,
    actionUrl: '/profile'
  }
];

// Initial state
const initialState: WhatsAppState = {
  isConnected: false,
  phoneNumber: null,
  isVerified: false,
  messages: sampleMessages,
  notificationsEnabled: true,
  isLoading: false,
  error: null
};

// Create the WhatsApp slice
const whatsAppSlice = createSlice({
  name: 'whatsApp',
  initialState,
  reducers: {
    connectWhatsApp: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    connectWhatsAppSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isConnected = true;
      state.phoneNumber = action.payload;
      state.error = null;
    },
    connectWhatsAppFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isConnected = false;
      state.error = action.payload;
    },
    verifyWhatsApp: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    verifyWhatsAppSuccess: (state) => {
      state.isLoading = false;
      state.isVerified = true;
      state.error = null;
    },
    verifyWhatsAppFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isVerified = false;
      state.error = action.payload;
    },
    disconnectWhatsApp: (state) => {
      state.isConnected = false;
      state.phoneNumber = null;
      state.isVerified = false;
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    markMessageAsRead: (state, action: PayloadAction<string>) => {
      const message = state.messages.find(msg => msg.id === action.payload);
      if (message) {
        message.isRead = true;
      }
    },
    markAllMessagesAsRead: (state) => {
      state.messages.forEach(message => {
        message.isRead = true;
      });
    },
    addMessage: (state, action: PayloadAction<WhatsAppMessage>) => {
      state.messages.unshift(action.payload);
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(msg => msg.id !== action.payload);
    },
    clearAllMessages: (state) => {
      state.messages = [];
    }
  }
});

// Export actions
export const {
  connectWhatsApp,
  connectWhatsAppSuccess,
  connectWhatsAppFailure,
  verifyWhatsApp,
  verifyWhatsAppSuccess,
  verifyWhatsAppFailure,
  disconnectWhatsApp,
  toggleNotifications,
  markMessageAsRead,
  markAllMessagesAsRead,
  addMessage,
  deleteMessage,
  clearAllMessages
} = whatsAppSlice.actions;

// Export selectors
export const selectWhatsAppConnection = (state: RootState) => ({
  isConnected: state.whatsApp.isConnected,
  phoneNumber: state.whatsApp.phoneNumber,
  isVerified: state.whatsApp.isVerified
});
export const selectWhatsAppMessages = (state: RootState) => state.whatsApp.messages;
export const selectUnreadMessages = (state: RootState) => 
  state.whatsApp.messages.filter(msg => !msg.isRead);
export const selectNotificationsEnabled = (state: RootState) => 
  state.whatsApp.notificationsEnabled;
export const selectWhatsAppLoading = (state: RootState) => state.whatsApp.isLoading;
export const selectWhatsAppError = (state: RootState) => state.whatsApp.error;

// Export reducer
export default whatsAppSlice.reducer;
