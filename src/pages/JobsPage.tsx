import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
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
  SelectChangeEvent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import StarIcon from '@mui/icons-material/Star';
import FilterListIcon from '@mui/icons-material/FilterList';

const JobsPage: React.FC = () => {
  const [location, setLocation] = React.useState('');
  const [category, setCategory] = React.useState('');

  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  // Mock job listings
  const jobs = [
    {
      id: 1,
      title: 'Construction Worker',
      location: 'Maputo',
      category: 'Construction',
      hourlyRate: '150 MZN',
      rating: 4.5,
      description: 'Need experienced construction worker for building project in Maputo.',
      duration: '3 days'
    },
    {
      id: 2,
      title: 'House Cleaner',
      location: 'Nampula',
      category: 'Domestic',
      hourlyRate: '120 MZN',
      rating: 4.0,
      description: 'Looking for house cleaner for weekly cleaning service.',
      duration: '1 day/week'
    },
    {
      id: 3,
      title: 'Delivery Driver',
      location: 'Beira',
      category: 'Transport',
      hourlyRate: '200 MZN',
      rating: 3.5,
      description: 'Delivery driver needed for local restaurant deliveries.',
      duration: 'Ongoing'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <WorkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          2. Find Jobs
        </Typography>
        
        <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            <FilterListIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Filter Jobs
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Search jobs..."
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="location-select-label">Location</InputLabel>
                <Select
                  labelId="location-select-label"
                  id="location-select"
                  value={location}
                  label="Location"
                  onChange={handleLocationChange}
                  startAdornment={<LocationOnIcon sx={{ ml: 1, mr: 1 }} />}
                >
                  <MenuItem value=""><em>All Locations</em></MenuItem>
                  <MenuItem value="Maputo">Maputo</MenuItem>
                  <MenuItem value="Beira">Beira</MenuItem>
                  <MenuItem value="Nampula">Nampula</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={category}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value=""><em>All Categories</em></MenuItem>
                  <MenuItem value="Construction">
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                      ⚒ Construction
                    </Box>
                  </MenuItem>
                  <MenuItem value="Domestic">
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                      🏠 Domestic
                    </Box>
                  </MenuItem>
                  <MenuItem value="Transport">
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                      🚗 Transport
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} key={job.id}>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {job.title}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOnIcon color="primary" sx={{ mr: 0.5 }} />
                        <Typography variant="body1" color="text.secondary">
                          {job.location}
                        </Typography>
                        
                        <Box component="span" sx={{ mx: 1 }}>•</Box>
                        
                        <Typography variant="body1" color="text.secondary">
                          {job.category}
                        </Typography>
                        
                        <Box component="span" sx={{ mx: 1 }}>•</Box>
                        
                        <Typography variant="body1" color="text.secondary">
                          {job.duration}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body1" paragraph>
                        {job.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating 
                          value={job.rating} 
                          readOnly 
                          precision={0.5}
                          icon={<StarIcon fontSize="inherit" />}
                        />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          ({job.rating})
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box>
                        <Chip 
                          label={job.hourlyRate + ' per hour'} 
                          color="primary" 
                          sx={{ fontWeight: 'bold', fontSize: '1rem', mb: 2 }} 
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button variant="contained" color="primary" size="large">
                          Apply Now
                        </Button>
                        <Button variant="outlined" color="primary">
                          Save Job
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default JobsPage;
