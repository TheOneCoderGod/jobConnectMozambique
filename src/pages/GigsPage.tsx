import React, { useState } from 'react';
import { 
  Container, Typography, Box, Pagination, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, Divider, Rating, Stack, Chip, Paper,
  Alert, CircularProgress
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

const GigsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const filteredGigs = useAppSelector(selectFilteredGigs);
  const selectedGig = useAppSelector(selectSelectedGig);
  const isLoading = useAppSelector(selectGigsLoading);
  const error = useAppSelector(selectGigsError);

  const [page, setPage] = useState<number>(1);
  const gigsPerPage = 6;

  const totalPages = Math.ceil(filteredGigs.length / gigsPerPage);
  const displayedGigs = filteredGigs.slice((page - 1) * gigsPerPage, page * gigsPerPage);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGig = (id: string) => dispatch(setSelectedGig(id));
  const handleCloseDialog = () => dispatch(clearSelectedGig());

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
        <Typography variant="h4" gutterBottom>
          <WorkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Gigs Platform
        </Typography>

        <Typography variant="body1" paragraph>
          Find temporary work opportunities near you. These short-term jobs can be completed in a few hours or days.
          Filter by location and category to find gigs that match your skills.
        </Typography>

        <TextToSpeech 
          text="Find temporary job opportunities quickly and easily. Filter gigs by your skills, location, and preferred job types."
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

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {displayedGigs.map((gig) => (
            <Box key={gig.id} sx={{ flex: '1 1 300px' }}>
              <GigCard gig={gig} onSelect={handleSelectGig} />
            </Box>
          ))}
        </Box>

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

        {selectedGig && (
          <Dialog open={!!selectedGig} onClose={handleCloseDialog} maxWidth="md" fullWidth scroll="paper">
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">{selectedGig.title}</Typography>
                <Chip label={selectedGig.category} color="primary" size="small" />
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body1" paragraph>{selectedGig.description}</Typography>
              {/* Additional details and layout as per original code */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button variant="contained" color="primary" startIcon={<PhoneIcon />}>Contact Employer</Button>
              <Button variant="contained" color="success">Apply for Gig</Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </Container>
  );
};

export default GigsPage;
