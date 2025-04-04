import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

// Define gig types
export interface Gig {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  duration: string;
  payment: string;
  rating: number;
  employerId: string;
  employerName: string;
  employerRating: number;
  contactNumber: string;
  postedDate: string;
  startDate: string;
  isUrgent: boolean;
  skills: string[];
  imageUrl?: string;
}

// Define filter state
interface FilterState {
  location: string;
  category: string;
  minRating: number;
  searchTerm: string;
}

// Define gigs state
interface GigsState {
  gigs: Gig[];
  filteredGigs: Gig[];
  selectedGig: Gig | null;
  filters: FilterState;
  isLoading: boolean;
  error: string | null;
}

// Sample gigs data
const sampleGigs: Gig[] = [
  {
    id: '1',
    title: 'House Cleaning',
    description: 'Need someone to clean a 3-bedroom house. Tasks include sweeping, mopping, dusting, and bathroom cleaning.',
    location: 'Maputo',
    category: 'domestic',
    duration: '4 hours',
    payment: '500 MZN',
    rating: 4.5,
    employerId: 'emp1',
    employerName: 'Maria Silva',
    employerRating: 4.8,
    contactNumber: '+258 84 123 4567',
    postedDate: '2025-04-01',
    startDate: '2025-04-05',
    isUrgent: true,
    skills: ['cleaning', 'housekeeping'],
  },
  {
    id: '2',
    title: 'Garden Work',
    description: 'Looking for someone to trim hedges, mow lawn, and plant flowers in a small garden.',
    location: 'Maputo',
    category: 'gardening',
    duration: '3 hours',
    payment: '400 MZN',
    rating: 4.2,
    employerId: 'emp2',
    employerName: 'João Ferreira',
    employerRating: 4.5,
    contactNumber: '+258 84 234 5678',
    postedDate: '2025-04-02',
    startDate: '2025-04-06',
    isUrgent: false,
    skills: ['gardening', 'landscaping'],
  },
  {
    id: '3',
    title: 'Moving Help',
    description: 'Need strong individuals to help move furniture from one apartment to another within the same building.',
    location: 'Beira',
    category: 'moving',
    duration: '5 hours',
    payment: '700 MZN',
    rating: 4.0,
    employerId: 'emp3',
    employerName: 'Ana Costa',
    employerRating: 4.2,
    contactNumber: '+258 84 345 6789',
    postedDate: '2025-04-02',
    startDate: '2025-04-07',
    isUrgent: true,
    skills: ['lifting', 'moving'],
  },
  {
    id: '4',
    title: 'Delivery Driver',
    description: 'Need someone with a motorcycle to deliver small packages around the city for a day.',
    location: 'Maputo',
    category: 'transport',
    duration: '8 hours',
    payment: '1000 MZN',
    rating: 4.7,
    employerId: 'emp4',
    employerName: 'Carlos Mendes',
    employerRating: 4.9,
    contactNumber: '+258 84 456 7890',
    postedDate: '2025-04-03',
    startDate: '2025-04-08',
    isUrgent: false,
    skills: ['driving', 'navigation'],
  },
  {
    id: '5',
    title: 'Market Stall Assistant',
    description: 'Looking for someone to help sell fruits and vegetables at a market stall for the weekend.',
    location: 'Nampula',
    category: 'retail',
    duration: '2 days',
    payment: '1200 MZN',
    rating: 4.3,
    employerId: 'emp5',
    employerName: 'Fatima Amade',
    employerRating: 4.6,
    contactNumber: '+258 84 567 8901',
    postedDate: '2025-04-03',
    startDate: '2025-04-09',
    isUrgent: false,
    skills: ['sales', 'customer service'],
  },
  {
    id: '6',
    title: 'Painter Needed',
    description: 'Need someone to paint two bedrooms and a living room. Paint and supplies provided.',
    location: 'Beira',
    category: 'construction',
    duration: '2 days',
    payment: '1500 MZN',
    rating: 4.8,
    employerId: 'emp6',
    employerName: 'Pedro Santos',
    employerRating: 4.7,
    contactNumber: '+258 84 678 9012',
    postedDate: '2025-04-04',
    startDate: '2025-04-10',
    isUrgent: true,
    skills: ['painting', 'construction'],
  },
  {
    id: '7',
    title: 'Childcare for Weekend',
    description: 'Looking for someone to take care of two children (ages 5 and 7) for a weekend while parents are away.',
    location: 'Maputo',
    category: 'childcare',
    duration: '2 days',
    payment: '1800 MZN',
    rating: 4.9,
    employerId: 'emp7',
    employerName: 'Luisa Machel',
    employerRating: 5.0,
    contactNumber: '+258 84 789 0123',
    postedDate: '2025-04-04',
    startDate: '2025-04-11',
    isUrgent: false,
    skills: ['childcare', 'cooking'],
  },
  {
    id: '8',
    title: 'Computer Repair',
    description: 'Need someone to fix a laptop that is running slow and has virus issues.',
    location: 'Nampula',
    category: 'technology',
    duration: '2 hours',
    payment: '600 MZN',
    rating: 4.6,
    employerId: 'emp8',
    employerName: 'Miguel Sousa',
    employerRating: 4.4,
    contactNumber: '+258 84 890 1234',
    postedDate: '2025-04-04',
    startDate: '2025-04-12',
    isUrgent: false,
    skills: ['computer repair', 'IT'],
  },
];

// Initial state
const initialState: GigsState = {
  gigs: sampleGigs,
  filteredGigs: sampleGigs,
  selectedGig: null,
  filters: {
    location: '',
    category: '',
    minRating: 0,
    searchTerm: '',
  },
  isLoading: false,
  error: null,
};

// Create the gigs slice
const gigsSlice = createSlice({
  name: 'gigs',
  initialState,
  reducers: {
    setSelectedGig: (state, action: PayloadAction<string>) => {
      state.selectedGig = state.gigs.find(gig => gig.id === action.payload) || null;
    },
    clearSelectedGig: (state) => {
      state.selectedGig = null;
    },
    setLocationFilter: (state, action: PayloadAction<string>) => {
      state.filters.location = action.payload;
      state.filteredGigs = applyFilters(state.gigs, state.filters);
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
      state.filteredGigs = applyFilters(state.gigs, state.filters);
    },
    setMinRatingFilter: (state, action: PayloadAction<number>) => {
      state.filters.minRating = action.payload;
      state.filteredGigs = applyFilters(state.gigs, state.filters);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
      state.filteredGigs = applyFilters(state.gigs, state.filters);
    },
    clearFilters: (state) => {
      state.filters = {
        location: '',
        category: '',
        minRating: 0,
        searchTerm: '',
      };
      state.filteredGigs = state.gigs;
    },
    fetchGigsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchGigsSuccess: (state, action: PayloadAction<Gig[]>) => {
      state.isLoading = false;
      state.gigs = action.payload;
      state.filteredGigs = applyFilters(action.payload, state.filters);
    },
    fetchGigsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Helper function to apply filters
const applyFilters = (gigs: Gig[], filters: FilterState): Gig[] => {
  return gigs.filter(gig => {
    // Apply location filter
    if (filters.location && gig.location !== filters.location) {
      return false;
    }
    
    // Apply category filter
    if (filters.category && gig.category !== filters.category) {
      return false;
    }
    
    // Apply rating filter
    if (gig.rating < filters.minRating) {
      return false;
    }
    
    // Apply search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      return (
        gig.title.toLowerCase().includes(searchLower) ||
        gig.description.toLowerCase().includes(searchLower) ||
        gig.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });
};

// Export actions
export const {
  setSelectedGig,
  clearSelectedGig,
  setLocationFilter,
  setCategoryFilter,
  setMinRatingFilter,
  setSearchTerm,
  clearFilters,
  fetchGigsStart,
  fetchGigsSuccess,
  fetchGigsFailure,
} = gigsSlice.actions;

// Export selectors
export const selectAllGigs = (state: RootState) => state.gigs.gigs;
export const selectFilteredGigs = (state: RootState) => state.gigs.filteredGigs;
export const selectSelectedGig = (state: RootState) => state.gigs.selectedGig;
export const selectGigsFilters = (state: RootState) => state.gigs.filters;
export const selectGigsLoading = (state: RootState) => state.gigs.isLoading;
export const selectGigsError = (state: RootState) => state.gigs.error;

// Export reducer
export default gigsSlice.reducer;
