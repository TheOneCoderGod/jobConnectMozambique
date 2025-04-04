import React from 'react';
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
  SelectChangeEvent
} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import LanguageIcon from '@mui/icons-material/Language';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TextToSpeech from '../components/accessibility/TextToSpeech';
import { useTranslation } from 'react-i18next';

const LanguagePage: React.FC = () => {
  const { t, i18n } = useTranslation<'translation'>(); // Explicitly specify the namespace
  
  // Handle language change
  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
  };
  
  // Get current language
  const currentLanguage = i18n.language;
  
  // Sample text for each language
  const sampleTexts = {
    en: "JobConnect helps you find job opportunities near you, even without internet access.",
    pt: "JobConnect ajuda-o a encontrar oportunidades de trabalho perto de si, mesmo sem acesso à internet.",
    changana: "JobConnect yi ku pfuna ku kuma mintirho ekusuhi na wena, hambi u ri hava internet.",
    macua: "JobConnect enawakiha ophwanya miteko vakhiviru ni nyuwo, muhirina internet."
  };
  
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <TranslateIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          {t('settings.language')}
        </Typography>
        
        <Typography variant="body1" paragraph>
          {t('app.description')}
        </Typography>
        
        <TextToSpeech 
          text={t('app.description')}
          language={currentLanguage === 'pt' ? 'pt-PT' : 'en-US'}
        />
        
        <Grid container spacing={4}>
          <Grid>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <LanguageIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                {t('settings.language')}
              </Typography>
              
              <Divider sx={{ mb: 3 }} />
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="language-select-label">{t('settings.language')}</InputLabel>
                <Select
                  labelId="language-select-label"
                  id="language-select"
                  value={currentLanguage}
                  label={t('settings.language')}
                  onChange={handleLanguageChange}
                >
                  <MenuItem value="pt">{t('languages.pt')}</MenuItem>
                  <MenuItem value="en">{t('languages.en')}</MenuItem>
                  <MenuItem value="changana">{t('languages.changana')}</MenuItem>
                  <MenuItem value="macua">{t('languages.macua')}</MenuItem>
                </Select>
              </FormControl>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                {t('settings.language')} - {t(`languages.${currentLanguage}`)}
              </Alert>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {t('app.title')}
                </Typography>
                <Typography variant="body1">
                  {sampleTexts[currentLanguage as keyof typeof sampleTexts]}
                </Typography>
              </Box>
              
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<TranslateIcon />}
                onClick={() => i18n.changeLanguage('pt')}
                sx={{ mr: 1, mb: 1 }}
              >
                Português
              </Button>
              
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<TranslateIcon />}
                onClick={() => i18n.changeLanguage('en')}
                sx={{ mr: 1, mb: 1 }}
              >
                English
              </Button>
              
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<TranslateIcon />}
                onClick={() => i18n.changeLanguage('changana')}
                sx={{ mr: 1, mb: 1 }}
              >
                Xichangana
              </Button>
              
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<TranslateIcon />}
                onClick={() => i18n.changeLanguage('macua')}
                sx={{ mb: 1 }}
              >
                Emakhuwa
              </Button>
            </Paper>
          </Grid>
          
          <Grid>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t('languages.pt')}
                </Typography>
                
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="body2" paragraph>
                  Português é a língua oficial de Moçambique.
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Língua oficial" 
                      secondary="Usada em documentos oficiais" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Amplamente falada" 
                      secondary="Especialmente em áreas urbanas" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Suporte completo" 
                      secondary="Todas as funcionalidades disponíveis" 
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
                  {t('languages.changana')} & {t('languages.macua')}
                </Typography>
                
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="body2" paragraph>
                  Línguas locais faladas em diferentes regiões de Moçambique.
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Changana" 
                      secondary="Falada no sul de Moçambique" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Macua" 
                      secondary="Falada no norte de Moçambique" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Suporte de acessibilidade" 
                      secondary="Leitura por voz disponível" 
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {t('common.help')}
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="body1" paragraph>
                {t('app.description')}
              </Typography>
              
              <Alert severity="info">
                {t('voice.tryVoice')}
              </Alert>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LanguagePage;
