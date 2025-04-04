import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Rating,
  Stack,
  Chip,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import TextToSpeech from '../components/accessibility/TextToSpeech';
import GigCard from '../components/gigs/GigCard';
import GigsFilter from '../components/gigs/GigsFilter';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  selectFilteredGigs,
  selectSelectedGig,
  selectGigsLoading,
  selectGigsError,
  setSelectedGig,
  clearSelectedGig
} from '../store/slices/gigsSlice';
import { CategoryIcon } from '../components/accessibility/AccessibleComponents';

const GigsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const filteredGigs = useAppSelector(selectFilteredGigs);
  const selectedGig = useAppSelector(selectSelectedGig);
  const isLoading = useAppSelector(selectGigsLoading);
  const error = useAppSelector(selectGigsError);
  
  // Local state
  const [page, setPage] = useState<number>(1);
  const gigsPerPage = 6;
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredGigs.length / gigsPerPage);
  const displayedGigs = filteredGigs.slice(
    (page - 1) * gigsPerPage,
    page * gigsPerPage
  );
  
  // Handle page change
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle gig selection
  const handleSelectGig = (id: string) => {
    dispatch(setSelectedGig(id));
  };
  
  // Handle dialog close
  const handleCloseDialog = () => {
    dispatch(clearSelectedGig());
  };
  
  // Format date to be more readable
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <WorkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          2. Gigs Platform
        </Typography>
        
        <Typography variant="body1" paragraph>
          Find temporary work opportunities near you. These short-term jobs can be completed in a few hours or days.
          Filter by location and category to find gigs that match your skills.
        </Typography>
        
        <TextToSpeech 
          text="On this page, you can find temporary work opportunities called gigs. These are short jobs that can be completed in a few hours or days. You can filter by location and job type to find work that matches your skills and is close to you."
          language="en-US"
        />
        
        <GigsFilter />
        
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {!isLoading && filteredGigs.length === 0 && (
          <Paper sx={{ p: 3, textAlign: 'center', my: 4 }}>
            <Typography variant="h6" gutterBottom>
              No gigs found
            </Typography>
            <Typography variant="body1">
              Try changing your filters or search term to find more opportunities.
            </Typography>
          </Paper>
        )}
        
        <Grid container spacing={3}>
          {displayedGigs.map((gig) => (
            <Grid key={gig.id}>
              <GigCard gig={gig} onSelect={handleSelectGig} />
            </Grid>
          ))}
        </Grid>
        
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
        
        {/* Gig Details Dialog */}
        <Dialog 
          open={!!selectedGig} 
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          {selectedGig && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6">{selectedGig.title}</Typography>
                  <Chip 
                    label={selectedGig.category.charAt(0).toUpperCase() + selectedGig.category.slice(1)} 
                    color="primary" 
                    size="small"
                  />
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                <Grid container spacing={3}>
                  <Grid>
                    <Typography variant="body1" paragraph>
                      {selectedGig.description}
                    </Typography>
                    
                    <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                      Required Skills:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                      {selectedGig.skills.map((skill) => (
                        <Chip 
                          key={skill} 
                          label={skill} 
                          variant="outlined" 
                          size="small" 
                        />
                      ))}
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle1" gutterBottom>
                      Job Details:
                    </Typography>
                    
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body1">
                          Location: {selectedGig.location}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body1">
                          Duration: {selectedGig.duration}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MonetizationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body1">
                          Payment: {selectedGig.payment}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarTodayIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body1">
                          Start Date: {formatDate(selectedGig.startDate)}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  
                  <Grid >
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        About the Employer:
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body1">
                          {selectedGig.employerName}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>
                          Employer Rating:
                        </Typography>
                        <Rating 
                          value={selectedGig.employerRating} 
                          precision={0.5} 
                          readOnly 
                          size="small" 
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PhoneIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body1">
                          {selectedGig.contactNumber}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          Posted on: {formatDate(selectedGig.postedDate)}
                        </Typography>
                      </Box>
                    </Paper>
                    
                    {selectedGig.isUrgent && (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        This is an urgent job that needs to be filled quickly.
                      </Alert>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>
                  Close
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<PhoneIcon />}
                >
                  Contact Employer
                </Button>
                <Button 
                  variant="contained" 
                  color="success"
                >
                  Apply for Gig
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </Container>
  );
};

export default GigsPage;
