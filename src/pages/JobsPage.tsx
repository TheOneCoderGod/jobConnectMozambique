import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Button,
  Rating,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Paper,
  Stack,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import FilterListIcon from '@mui/icons-material/FilterList';
import StarIcon from '@mui/icons-material/Star';
import WorkIcon from '@mui/icons-material/Work';

const JobsPage: React.FC = () => {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Mock data
  const jobs = [
    {
      id: 1,
      title: 'Construction Worker',
      location: 'Maputo',
      category: 'Construction',
      hourlyRate: '150 MZN',
      rating: 4.5,
      description: 'Need experienced construction worker for building project in Maputo.',
      duration: '3 days',
    },
    {
      id: 2,
      title: 'House Cleaner',
      location: 'Nampula',
      category: 'Domestic',
      hourlyRate: '120 MZN',
      rating: 4.0,
      description: 'Looking for house cleaner for weekly cleaning service.',
      duration: '1 day/week',
    },
    {
      id: 3,
      title: 'Delivery Driver',
      location: 'Beira',
      category: 'Transport',
      hourlyRate: '200 MZN',
      rating: 3.5,
      description: 'Delivery driver needed for local restaurant deliveries.',
      duration: 'Ongoing',
    },
    {
      id: 4,
      title: 'Farm Worker',
      location: 'Chimoio',
      category: 'Agriculture',
      hourlyRate: '130 MZN',
      rating: 4.2,
      description: 'Help needed for seasonal harvesting.',
      duration: '2 weeks',
    },
    {
      id: 5,
      title: 'Electrician',
      location: 'Quelimane',
      category: 'Construction',
      hourlyRate: '250 MZN',
      rating: 4.8,
      description: 'Experienced electrician needed for residential wiring.',
      duration: '5 days',
    },
    {
      id: 6,
      title: 'Chef Assistant',
      location: 'Tete',
      category: 'Hospitality',
      hourlyRate: '180 MZN',
      rating: 4.3,
      description: 'Assist in busy restaurant kitchen.',
      duration: 'Ongoing',
    },
  ];

  // Filtering logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) =>
      (location ? job.location === location : true) &&
      (category ? job.category === category : true) &&
      (searchTerm ? job.title.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    );
  }, [location, category, searchTerm, jobs]);

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          width: '100%',
          py: 6,
          background: 'linear-gradient(120deg,rgb(255, 255, 255) 0%,rgb(255, 255, 255) 100%)',
          color: '#000',
          mb: 4, // space below the hero
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 700 }} gutterBottom>
            <WorkIcon
              sx={{
                mr: 1,
                verticalAlign: 'middle',
                fontSize: '2.2rem',
                mb: '-3px',
              }}
            />
            Find Jobs
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 600 }}>
            Explore a wide range of job opportunities in various categories
            around Mozambique. Filter by location, category, or search by title
            to find the perfect match for your skills.
          </Typography>
        </Container>
      </Box>

      {/* Filter Panel */}
      <Container maxWidth="lg">
        <Paper
          sx={{
            mb: 4,
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            <FilterListIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Filter Jobs
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems="center"
          >
            <TextField
              fullWidth
              placeholder="Search jobs..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={location}
                label="Location"
                onChange={handleLocationChange}
              >
                <MenuItem value="">
                  <em>All Locations</em>
                </MenuItem>
                <MenuItem value="Maputo">Maputo</MenuItem>
                <MenuItem value="Beira">Beira</MenuItem>
                <MenuItem value="Nampula">Nampula</MenuItem>
                <MenuItem value="Chimoio">Chimoio</MenuItem>
                <MenuItem value="Quelimane">Quelimane</MenuItem>
                <MenuItem value="Tete">Tete</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">
                  <em>All Categories</em>
                </MenuItem>
                <MenuItem value="Construction">⚒ Construction</MenuItem>
                <MenuItem value="Domestic">🏠 Domestic</MenuItem>
                <MenuItem value="Transport">🚗 Transport</MenuItem>
                <MenuItem value="Agriculture">🌾 Agriculture</MenuItem>
                <MenuItem value="Hospitality">🍽️ Hospitality</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        {/* Jobs List */}
        <Stack spacing={3} sx={{ mb: 6 }}>
          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              sx={{
                position: 'relative',
                boxShadow: 2,
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              {/* Decorative background circle in top-right */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 140,
                  height: 140,
                  background:
                    'radial-gradient(circle at center, #90caf9 0%, transparent 60%)',
                  borderRadius: '50%',
                  opacity: 0.3,
                  zIndex: 0,
                }}
              />
              <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                {/* Top row: Title on left, rating + pay on right */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {job.title}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Rating
                      value={job.rating}
                      readOnly
                      precision={0.5}
                      icon={<StarIcon htmlColor="#ffb400" />}
                    />
                    <Chip
                      label={`${job.hourlyRate} per hour`}
                      color="primary"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>
                </Box>

                {/* Second row: location, category, duration */}
                <Box
                  display="flex"
                  alignItems="center"
                  flexWrap="wrap"
                  gap={1}
                  mb={1}
                  color="text.secondary"
                >
                  <Box display="flex" alignItems="center">
                    <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">{job.location}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <CategoryIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">{job.category}</Typography>
                  </Box>
                  <Chip
                    label={job.duration}
                    variant="outlined"
                    size="small"
                    sx={{
                      color: 'text.secondary',
                      borderColor: 'text.secondary',
                      fontSize: '0.75rem',
                      height: '1.4rem',
                    }}
                  />
                </Box>

                {/* Description */}
                <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                  {job.description}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {/* Bottom row: CTA buttons aligned to the right */}
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button variant="contained" color="primary">
                    Apply Now
                  </Button>
                  <Button variant="outlined">Save Job</Button>
                </Box>
              </CardContent>
            </Card>
          ))}

          {/* If no jobs matched */}
          {filteredJobs.length === 0 && (
            <Typography variant="body1">No jobs found with the current filters.</Typography>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default JobsPage;
