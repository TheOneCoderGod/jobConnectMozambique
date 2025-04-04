import React, { useState } from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField,
  InputAdornment,
  Grid,
  Typography,
  Paper,
  Slider,
  Button,
  Chip,
  SelectChangeEvent,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import StarIcon from '@mui/icons-material/Star';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch, useAppSelector } from '../../store';
import { 
  setLocationFilter, 
  setCategoryFilter, 
  setMinRatingFilter,
  setSearchTerm,
  clearFilters,
  selectGigsFilters
} from '../../store/slices/gigsSlice';

// Define available locations
const locations = ['Maputo', 'Beira', 'Nampula'];

// Define available categories
const categories = [
  'domestic',
  'gardening',
  'moving',
  'transport',
  'retail',
  'construction',
  'childcare',
  'technology'
];

const GigsFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectGigsFilters);
  
  // Local state for expanded filter view
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  // Handle location change
  const handleLocationChange = (event: SelectChangeEvent<string>) => {
    dispatch(setLocationFilter(event.target.value));
  };
  
  // Handle category change
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    dispatch(setCategoryFilter(event.target.value));
  };
  
  // Handle rating change
  const handleRatingChange = (_event: Event, newValue: number | number[]) => {
    dispatch(setMinRatingFilter(newValue as number));
  };
  
  // Handle search term change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };
  
  // Handle clear filters
  const handleClearFilters = () => {
    dispatch(clearFilters());
  };
  
  // Toggle filter visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Format category name for display
  const formatCategory = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for gigs..."
          value={filters.searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={toggleFilters}
          size="small"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
        
        <Stack direction="row" spacing={1}>
          {filters.location && (
            <Chip 
              icon={<LocationOnIcon />} 
              label={filters.location} 
              onDelete={() => dispatch(setLocationFilter(''))}
              color="primary"
              variant="outlined"
              size="small"
            />
          )}
          
          {filters.category && (
            <Chip 
              icon={<CategoryIcon />} 
              label={formatCategory(filters.category)} 
              onDelete={() => dispatch(setCategoryFilter(''))}
              color="primary"
              variant="outlined"
              size="small"
            />
          )}
          
          {filters.minRating > 0 && (
            <Chip 
              icon={<StarIcon />} 
              label={`${filters.minRating}+ Stars`} 
              onDelete={() => dispatch(setMinRatingFilter(0))}
              color="primary"
              variant="outlined"
              size="small"
            />
          )}
          
          {(filters.location || filters.category || filters.minRating > 0 || filters.searchTerm) && (
            <Chip 
              icon={<ClearIcon />} 
              label="Clear All" 
              onClick={handleClearFilters}
              color="error"
              variant="outlined"
              size="small"
            />
          )}
        </Stack>
      </Box>
      
      {showFilters && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="location-filter-label">Location</InputLabel>
              <Select
                labelId="location-filter-label"
                id="location-filter"
                value={filters.location}
                label="Location"
                onChange={handleLocationChange}
              >
                <MenuItem value="">
                  <em>All Locations</em>
                </MenuItem>
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="category-filter-label">Category</InputLabel>
              <Select
                labelId="category-filter-label"
                id="category-filter"
                value={filters.category}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">
                  <em>All Categories</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {formatCategory(category)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ px: 1 }}>
              <Typography id="rating-slider-label" gutterBottom>
                Minimum Rating
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Slider
                  value={filters.minRating}
                  onChange={handleRatingChange}
                  aria-labelledby="rating-slider-label"
                  valueLabelDisplay="auto"
                  step={0.5}
                  marks
                  min={0}
                  max={5}
                />
                <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2">
                    {filters.minRating}
                  </Typography>
                  <StarIcon fontSize="small" sx={{ ml: 0.5, color: 'gold' }} />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default GigsFilter;
