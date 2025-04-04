import React, { useState, useMemo } from 'react';
import { 
  Container, Typography, Box, Card, CardContent, Chip, Button, Rating, TextField, InputAdornment,
  FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import StarIcon from '@mui/icons-material/Star';
import FilterListIcon from '@mui/icons-material/FilterList';

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

  const jobs = [
    { id: 1, title: 'Construction Worker', location: 'Maputo', category: 'Construction', hourlyRate: '150 MZN', rating: 4.5, description: 'Need experienced construction worker for building project in Maputo.', duration: '3 days' },
    { id: 2, title: 'House Cleaner', location: 'Nampula', category: 'Domestic', hourlyRate: '120 MZN', rating: 4.0, description: 'Looking for house cleaner for weekly cleaning service.', duration: '1 day/week' },
    { id: 3, title: 'Delivery Driver', location: 'Beira', category: 'Transport', hourlyRate: '200 MZN', rating: 3.5, description: 'Delivery driver needed for local restaurant deliveries.', duration: 'Ongoing' },
    { id: 4, title: 'Farm Worker', location: 'Chimoio', category: 'Agriculture', hourlyRate: '130 MZN', rating: 4.2, description: 'Help needed for seasonal harvesting.', duration: '2 weeks' },
    { id: 5, title: 'Electrician', location: 'Quelimane', category: 'Construction', hourlyRate: '250 MZN', rating: 4.8, description: 'Experienced electrician needed for residential wiring.', duration: '5 days' },
    { id: 6, title: 'Chef Assistant', location: 'Tete', category: 'Hospitality', hourlyRate: '180 MZN', rating: 4.3, description: 'Assist in busy restaurant kitchen.', duration: 'Ongoing' },
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter(job =>
      (location ? job.location === location : true) &&
      (category ? job.category === category : true) &&
      (searchTerm ? job.title.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    );
  }, [location, category, searchTerm, jobs]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          <WorkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Find Jobs
        </Typography>

        <Paper sx={{ mb: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            <FilterListIcon sx={{ mr: 1 }} />
            Filter Jobs
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <TextField
              fullWidth
              placeholder="Search jobs..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
              sx={{ flex: 1, minWidth: '250px' }}
            />

            <FormControl fullWidth sx={{ flex: 1, minWidth: '200px' }}>
              <InputLabel>Location</InputLabel>
              <Select value={location} label="Location" onChange={handleLocationChange}>
                <MenuItem value=""><em>All Locations</em></MenuItem>
                <MenuItem value="Maputo">Maputo</MenuItem>
                <MenuItem value="Beira">Beira</MenuItem>
                <MenuItem value="Nampula">Nampula</MenuItem>
                <MenuItem value="Chimoio">Chimoio</MenuItem>
                <MenuItem value="Quelimane">Quelimane</MenuItem>
                <MenuItem value="Tete">Tete</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ flex: 1, minWidth: '200px' }}>
              <InputLabel>Category</InputLabel>
              <Select value={category} label="Category" onChange={handleCategoryChange}>
                <MenuItem value=""><em>All Categories</em></MenuItem>
                <MenuItem value="Construction">⚒ Construction</MenuItem>
                <MenuItem value="Domestic">🏠 Domestic</MenuItem>
                <MenuItem value="Transport">🚗 Transport</MenuItem>
                <MenuItem value="Agriculture">🌾 Agriculture</MenuItem>
                <MenuItem value="Hospitality">🍽️ Hospitality</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {filteredJobs.map((job) => (
            <Card key={job.id}>
              <CardContent>
                <Typography variant="h5" gutterBottom>{job.title}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <LocationOnIcon fontSize="small" /> {job.location} • {job.category} • {job.duration}
                </Typography>
                <Typography variant="body1" paragraph>{job.description}</Typography>
                <Rating value={job.rating} readOnly precision={0.5} icon={<StarIcon />} />
                <Chip label={`${job.hourlyRate} per hour`} color="primary" sx={{ fontWeight: 'bold', mt: 2 }} />
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button variant="contained">Apply Now</Button>
                  <Button variant="outlined">Save Job</Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default JobsPage;
