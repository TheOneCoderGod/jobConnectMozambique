import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WorkIcon from '@mui/icons-material/Work';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MapIcon from '@mui/icons-material/Map';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import TuneIcon from '@mui/icons-material/Tune';
import { useThemeContext } from '../../contexts/ThemeContext';

// Pages for navigation (with icons)
const pages = [
  { name: 'Home', path: '/', icon: <HomeIcon fontSize="small" /> },
  { name: 'Jobs', path: '/jobs', icon: <WorkOutlineIcon fontSize="small" /> },
  { name: 'Gigs', path: '/gigs', icon: <AutoAwesomeMotionIcon fontSize="small" /> },
  { name: 'Map', path: '/offline-map', icon: <MapIcon fontSize="small" /> },
  { name: 'USSD', path: '/ussd', icon: <PhoneAndroidIcon fontSize="small" /> },
  { name: 'Voice', path: '/voice-reading', icon: <RecordVoiceOverIcon fontSize="small" /> },
  { name: 'WhatsApp', path: '/whatsapp', icon: <WhatsAppIcon fontSize="small" /> },
  { name: 'Language', path: '/language', icon: <LanguageIcon fontSize="small" /> },
  { name: 'Profile', path: '/profile', icon: <PersonIcon fontSize="small" /> },
  { name: 'Optimization', path: '/optimization', icon: <TuneIcon fontSize="small" /> },
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { toggleColorMode, mode } = useThemeContext();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        mb: 2,
        // Subtle gradient for a more eye-catching header
        background: 'linear-gradient(120deg, #1976d2 0%, #42a5f5 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo (Desktop) */}
          <WorkIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            JobConnect
          </Typography>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.path}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {/* Icon + Label for Mobile */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    {page.icon}
                  </Box>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo (Mobile) */}
          <WorkIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            JobConnect
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                startIcon={page.icon}
                sx={{
                  my: 1,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  mx: 1,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Dark Mode Toggle */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              sx={{ ml: 1 }}
              onClick={toggleColorMode}
              color="inherit"
              aria-label={
                mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
              }
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
