import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  SelectChangeEvent
} from '@mui/material';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import TranslateIcon from '@mui/icons-material/Translate';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EnhancedVoiceReader from '../components/accessibility/EnhancedVoiceReader';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  selectVoiceSettings,
  setLanguage,
  toggleVoiceReading,
  toggleAutoRead,
  toggleHighlightText,
  toggleNumericNavigation,
  SupportedLanguage
} from '../store/slices/voiceReadingSlice';

const VoiceReadingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectVoiceSettings);
  
  // Local state
  const [demoText, setDemoText] = useState<string>(
    "Olá! Este é o modo de leitura por voz do JobConnect Mozambique. " +
    "Esta funcionalidade ajuda pessoas com dificuldades de leitura a usar o aplicativo. " +
    "Você pode ajustar a velocidade, o tom e o volume da voz nas configurações."
  );
  
  // Handle language change
  const handleLanguageChange = (event: SelectChangeEvent<SupportedLanguage>) => {
    const newLanguage = event.target.value as SupportedLanguage;
    dispatch(setLanguage(newLanguage));
    
    // Update demo text based on language
    switch (newLanguage) {
      case SupportedLanguage.ENGLISH:
        setDemoText(
          "Hello! This is the voice reading mode of JobConnect Mozambique. " +
          "This feature helps people with reading difficulties to use the application. " +
          "You can adjust the speed, pitch, and volume of the voice in the settings."
        );
        break;
      case SupportedLanguage.PORTUGUESE:
        setDemoText(
          "Olá! Este é o modo de leitura por voz do JobConnect Mozambique. " +
          "Esta funcionalidade ajuda pessoas com dificuldades de leitura a usar o aplicativo. " +
          "Você pode ajustar a velocidade, o tom e o volume da voz nas configurações."
        );
        break;
      case SupportedLanguage.CHANGANA:
        setDemoText(
          "Minjhani! Leyi i ndlela yo hlaya hi rito ya JobConnect Mozambique. " +
          "Xitirhisiwa lexi xi pfuna vanhu lava nga na swiphiqo swo hlaya ku tirhisa app. " +
          "U nga lulamisa rivilo, mpimo na voluumu ya rito eka switirhisiwa."
        );
        break;
      case SupportedLanguage.MACUA:
        setDemoText(
          "Kosha olé! Ola ti modo ya osoma ni nlumi wa JobConnect Mozambique. " +
          "Efetura ila enawakiha atthu yarina wulumo ni osoma othepaka aplicasau. " +
          "Nyuwo mwakwanisa othankuliha rivelo, mpimo ni voluume ya nlumi ni configurasau."
        );
        break;
    }
  };
  
  // Get language name
  const getLanguageName = (lang: SupportedLanguage): string => {
    switch (lang) {
      case SupportedLanguage.ENGLISH:
        return 'English';
      case SupportedLanguage.PORTUGUESE:
        return 'Portuguese';
      case SupportedLanguage.CHANGANA:
        return 'Changana';
      case SupportedLanguage.MACUA:
        return 'Macua';
      default:
        return 'Unknown';
    }
  };
  
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <RecordVoiceOverIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          5. Voice Reading Mode
        </Typography>
        
        <Typography variant="body1" paragraph>
          Voice Reading Mode reads text aloud to help users with limited literacy. 
          You can choose different languages and adjust how the voice sounds.
        </Typography>
        
        <Grid container spacing={4}>
          <Grid >
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <VolumeUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Try Voice Reading
              </Typography>
              
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-language-label">Language</InputLabel>
                  <Select
                    labelId="demo-language-label"
                    id="demo-language-select"
                    value={settings.language}
                    label="Language"
                    onChange={handleLanguageChange}
                  >
                    <MenuItem value={SupportedLanguage.PORTUGUESE}>Portuguese</MenuItem>
                    <MenuItem value={SupportedLanguage.ENGLISH}>English</MenuItem>
                    <MenuItem value={SupportedLanguage.CHANGANA}>Changana</MenuItem>
                    <MenuItem value={SupportedLanguage.MACUA}>Macua</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                Click the play button below to hear the text in {getLanguageName(settings.language)}.
              </Alert>
              
              <EnhancedVoiceReader 
                text={demoText}
                language={settings.language}
                showControls={true}
              />
              
              <Paper variant="outlined" sx={{ p: 2, mt: 3 }}>
                <Typography variant="body1">
                  {demoText}
                </Typography>
              </Paper>
              
              <Box sx={{ mt: 3 }}>
                <Button 
                  variant="contained" 
                  color={settings.enabled ? "error" : "primary"}
                  onClick={() => dispatch(toggleVoiceReading())}
                  startIcon={settings.enabled ? null : <VolumeUpIcon />}
                >
                  {settings.enabled ? "Disable Voice Reading" : "Enable Voice Reading"}
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <TranslateIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Language Support
                </Typography>
                
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="body2" paragraph>
                  Voice Reading Mode supports these languages:
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Portuguese" 
                      secondary="Official language of Mozambique" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="English" 
                      secondary="For international users" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Changana" 
                      secondary="Spoken in southern Mozambique" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Macua" 
                      secondary="Spoken in northern Mozambique" 
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <AccessibilityNewIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Voice Reading Settings
                </Typography>
                
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={settings.autoRead} 
                        onChange={() => dispatch(toggleAutoRead())} 
                      />
                    }
                    label="Auto-read content when page loads"
                  />
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={settings.highlightText} 
                        onChange={() => dispatch(toggleHighlightText())} 
                      />
                    }
                    label="Highlight text being read"
                  />
                </Box>
                
                <Box>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={settings.numericNavigation} 
                        onChange={() => dispatch(toggleNumericNavigation())} 
                      />
                    }
                    label="Enable numeric navigation commands"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid >
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <KeyboardIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Voice Commands
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="body1" paragraph>
                You can use these numeric commands to control the voice reading:
              </Typography>
              
              <Grid container spacing={2}>
                <Grid >
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Press 1" 
                        secondary="Start reading" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Press 2" 
                        secondary="Pause reading" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Press 3" 
                        secondary="Stop reading" 
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Press 4" 
                        secondary="Increase volume" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Press 5" 
                        secondary="Decrease volume" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Press 0" 
                        secondary="Change language" 
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                These commands work when numeric navigation is enabled in the settings.
              </Alert>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default VoiceReadingPage;
