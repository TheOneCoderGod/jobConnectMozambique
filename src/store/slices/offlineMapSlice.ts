import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

// Define location interface
export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  jobCount: number;
  isPopular: boolean;
}

// Define job opportunity interface for offline map
export interface MapJobOpportunity {
  id: string;
  title: string;
  category: string;
  location: string;
  latitude: number;
  longitude: number;
  payment: string;
  employerName: string;
  contactNumber: string;
  isUrgent: boolean;
  expiryDate: string;
}

// Define offline map state
interface OfflineMapState {
  locations: Location[];
  jobOpportunities: MapJobOpportunity[];
  selectedLocation: string | null;
  selectedJobId: string | null;
  lastUpdated: string | null;
  isMapDataCached: boolean;
  isLoading: boolean;
  error: string | null;
}

// Sample locations data
const sampleLocations: Location[] = [
  {
    id: 'maputo',
    name: 'Maputo',
    latitude: -25.9692,
    longitude: 32.5732,
    jobCount: 24,
    isPopular: true
  },
  {
    id: 'beira',
    name: 'Beira',
    latitude: -19.8436,
    longitude: 34.8389,
    jobCount: 15,
    isPopular: true
  },
  {
    id: 'nampula',
    name: 'Nampula',
    latitude: -15.1165,
    longitude: 39.2666,
    jobCount: 18,
    isPopular: true
  },
  {
    id: 'matola',
    name: 'Matola',
    latitude: -25.9622,
    longitude: 32.4589,
    jobCount: 12,
    isPopular: false
  },
  {
    id: 'xai-xai',
    name: 'Xai-Xai',
    latitude: -25.0519,
    longitude: 33.6442,
    jobCount: 8,
    isPopular: false
  },
  {
    id: 'chimoio',
    name: 'Chimoio',
    latitude: -19.1164,
    longitude: 33.4833,
    jobCount: 10,
    isPopular: false
  },
  {
    id: 'quelimane',
    name: 'Quelimane',
    latitude: -17.8786,
    longitude: 36.8883,
    jobCount: 7,
    isPopular: false
  },
  {
    id: 'tete',
    name: 'Tete',
    latitude: -16.1564,
    longitude: 33.5867,
    jobCount: 9,
    isPopular: false
  }
];

// Sample job opportunities data
const sampleJobOpportunities: MapJobOpportunity[] = [
  {
    id: 'job1',
    title: 'Construction Helper',
    category: 'construction',
    location: 'Maputo',
    latitude: -25.9692,
    longitude: 32.5732,
    payment: '500 MZN/day',
    employerName: 'ABC Construction',
    contactNumber: '+258 84 123 4567',
    isUrgent: true,
    expiryDate: '2025-04-15'
  },
  {
    id: 'job2',
    title: 'Market Vendor Assistant',
    category: 'retail',
    location: 'Maputo',
    latitude: -25.9712,
    longitude: 32.5752,
    payment: '400 MZN/day',
    employerName: 'Central Market',
    contactNumber: '+258 84 234 5678',
    isUrgent: false,
    expiryDate: '2025-04-20'
  },
  {
    id: 'job3',
    title: 'Delivery Driver',
    category: 'transport',
    location: 'Maputo',
    latitude: -25.9672,
    longitude: 32.5712,
    payment: '600 MZN/day',
    employerName: 'Quick Delivery',
    contactNumber: '+258 84 345 6789',
    isUrgent: true,
    expiryDate: '2025-04-10'
  },
  {
    id: 'job4',
    title: 'House Cleaner',
    category: 'domestic',
    location: 'Beira',
    latitude: -19.8436,
    longitude: 34.8389,
    payment: '450 MZN/day',
    employerName: 'Maria Silva',
    contactNumber: '+258 84 456 7890',
    isUrgent: false,
    expiryDate: '2025-04-25'
  },
  {
    id: 'job5',
    title: 'Security Guard',
    category: 'security',
    location: 'Beira',
    latitude: -19.8456,
    longitude: 34.8409,
    payment: '550 MZN/day',
    employerName: 'Secure Solutions',
    contactNumber: '+258 84 567 8901',
    isUrgent: true,
    expiryDate: '2025-04-12'
  },
  {
    id: 'job6',
    title: 'Farm Worker',
    category: 'agriculture',
    location: 'Nampula',
    latitude: -15.1165,
    longitude: 39.2666,
    payment: '400 MZN/day',
    employerName: 'Green Farms',
    contactNumber: '+258 84 678 9012',
    isUrgent: false,
    expiryDate: '2025-04-30'
  },
  {
    id: 'job7',
    title: 'Restaurant Server',
    category: 'hospitality',
    location: 'Nampula',
    latitude: -15.1185,
    longitude: 39.2686,
    payment: '500 MZN/day',
    employerName: 'Seaside Restaurant',
    contactNumber: '+258 84 789 0123',
    isUrgent: false,
    expiryDate: '2025-04-18'
  },
  {
    id: 'job8',
    title: 'Electrician Helper',
    category: 'construction',
    location: 'Matola',
    latitude: -25.9622,
    longitude: 32.4589,
    payment: '600 MZN/day',
    employerName: 'Power Solutions',
    contactNumber: '+258 84 890 1234',
    isUrgent: true,
    expiryDate: '2025-04-14'
  }
];

// Initial state
const initialState: OfflineMapState = {
  locations: sampleLocations,
  jobOpportunities: sampleJobOpportunities,
  selectedLocation: null,
  selectedJobId: null,
  lastUpdated: new Date().toISOString(),
  isMapDataCached: true,
  isLoading: false,
  error: null
};

// Create the offline map slice
const offlineMapSlice = createSlice({
  name: 'offlineMap',
  initialState,
  reducers: {
    selectLocation: (state, action: PayloadAction<string>) => {
      state.selectedLocation = action.payload;
      state.selectedJobId = null;
    },
    clearSelectedLocation: (state) => {
      state.selectedLocation = null;
      state.selectedJobId = null;
    },
    selectJob: (state, action: PayloadAction<string>) => {
      state.selectedJobId = action.payload;
    },
    clearSelectedJob: (state) => {
      state.selectedJobId = null;
    },
    fetchMapDataStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchMapDataSuccess: (state, action: PayloadAction<{
      locations: Location[];
      jobOpportunities: MapJobOpportunity[];
    }>) => {
      state.isLoading = false;
      state.locations = action.payload.locations;
      state.jobOpportunities = action.payload.jobOpportunities;
      state.lastUpdated = new Date().toISOString();
      state.isMapDataCached = true;
      state.error = null;
    },
    fetchMapDataFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setCacheStatus: (state, action: PayloadAction<boolean>) => {
      state.isMapDataCached = action.payload;
    }
  }
});

// Export actions
export const {
  selectLocation,
  clearSelectedLocation,
  selectJob,
  clearSelectedJob,
  fetchMapDataStart,
  fetchMapDataSuccess,
  fetchMapDataFailure,
  setCacheStatus
} = offlineMapSlice.actions;

// Export selectors
export const selectAllLocations = (state: RootState) => state.offlineMap.locations;
export const selectJobOpportunities = (state: RootState) => state.offlineMap.jobOpportunities;
export const selectJobsByLocation = (state: RootState) => {
  const selectedLocation = state.offlineMap.selectedLocation;
  if (!selectedLocation) return [];
  return state.offlineMap.jobOpportunities.filter(job => job.location.toLowerCase() === selectedLocation.toLowerCase());
};
export const selectSelectedLocation = (state: RootState) => {
  const locationId = state.offlineMap.selectedLocation;
  if (!locationId) return null;
  return state.offlineMap.locations.find(loc => loc.id === locationId) || null;
};
export const selectSelectedJob = (state: RootState) => {
  const jobId = state.offlineMap.selectedJobId;
  if (!jobId) return null;
  return state.offlineMap.jobOpportunities.find(job => job.id === jobId) || null;
};
export const selectLastUpdated = (state: RootState) => state.offlineMap.lastUpdated;
export const selectIsMapDataCached = (state: RootState) => state.offlineMap.isMapDataCached;
export const selectOfflineMapLoading = (state: RootState) => state.offlineMap.isLoading;
export const selectOfflineMapError = (state: RootState) => state.offlineMap.error;

// Export reducer
export default offlineMapSlice.reducer;
