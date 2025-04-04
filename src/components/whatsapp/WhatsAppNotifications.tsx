import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Divider,
  Badge,
  IconButton,
  Chip,
  Button,
  useTheme
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { useAppDispatch, useAppSelector } from '../../store';
import { 
  selectWhatsAppConnection, 
  selectWhatsAppMessages,
  selectUnreadMessages,
  selectNotificationsEnabled,
  toggleNotifications,
  markMessageAsRead,
  markAllMessagesAsRead,
  NotificationType
} from '../../store/slices/whatsAppSlice';

const WhatsAppNotifications: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  
  const { isConnected, phoneNumber, isVerified } = useAppSelector(selectWhatsAppConnection);
  const messages = useAppSelector(selectWhatsAppMessages);
  const unreadMessages = useAppSelector(selectUnreadMessages);
  const notificationsEnabled = useAppSelector(selectNotificationsEnabled);
  
  // Format timestamp to readable format
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get icon for message type
  const getMessageIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.JOB_ALERT:
        return <WorkIcon color="primary" />;
      case NotificationType.INTERVIEW_REMINDER:
        return <EventIcon color="secondary" />;
      case NotificationType.APPLICATION_STATUS:
        return <CheckCircleIcon color="success" />;
      default:
        return <AnnouncementIcon color="info" />;
    }
  };
  
  // Handle message click
  const handleMessageClick = (id: string) => {
    dispatch(markMessageAsRead(id));
  };
  
  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    dispatch(markAllMessagesAsRead());
  };
  
  // Handle toggle notifications
  const handleToggleNotifications = () => {
    dispatch(toggleNotifications());
  };
  
  // If not connected, show connection prompt
  if (!isConnected) {
    return (
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <WhatsAppIcon sx={{ fontSize: 40, color: '#25D366', mr: 2 }} />
          <Typography variant="h6">
            Connect WhatsApp
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph>
          Connect your WhatsApp account to receive job notifications, application updates, and interview reminders.
        </Typography>
        
        <Button 
          variant="contained" 
          color="success" 
          startIcon={<WhatsAppIcon />}
          fullWidth
          sx={{ 
            bgcolor: '#25D366',
            '&:hover': {
              bgcolor: '#128C7E'
            }
          }}
        >
          Connect WhatsApp
        </Button>
      </Paper>
    );
  }
  
  return (
    <Paper sx={{ mb: 3 }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: '#128C7E',
        color: 'white'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <WhatsAppIcon sx={{ fontSize: 28, mr: 1 }} />
          <Typography variant="h6">
            WhatsApp Notifications
          </Typography>
        </Box>
        
        <Box>
          <IconButton 
            color="inherit" 
            onClick={handleToggleNotifications}
            aria-label={notificationsEnabled ? "Disable notifications" : "Enable notifications"}
          >
            {notificationsEnabled ? <NotificationsIcon /> : <NotificationsOffIcon />}
          </IconButton>
        </Box>
      </Box>
      
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Connected: {phoneNumber}
        </Typography>
        
        {unreadMessages.length > 0 && (
          <Button 
            size="small" 
            onClick={handleMarkAllAsRead}
            sx={{ textTransform: 'none' }}
          >
            Mark all as read
          </Button>
        )}
      </Box>
      
      <Divider />
      
      {messages.length === 0 ? (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No messages yet
          </Typography>
        </Box>
      ) : (
        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
          {messages.map((message) => (
            <React.Fragment key={message.id}>
              <ListItem 
                alignItems="flex-start"
                sx={{ 
                  bgcolor: message.isRead ? 'inherit' : 'rgba(37, 211, 102, 0.1)',
                  transition: 'background-color 0.3s ease'
                }}
                onClick={() => handleMessageClick(message.id)}
              >
                <ListItemIcon>
                  {getMessageIcon(message.type)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="subtitle1" component="span">
                        {message.title}
                      </Typography>
                      {!message.isRead && (
                        <FiberNewIcon 
                          color="error" 
                          fontSize="small" 
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        component="span"
                        sx={{ display: 'block', mb: 1 }}
                      >
                        {message.content}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          component="span"
                        >
                          {formatTimestamp(message.timestamp)}
                        </Typography>
                        
                        {message.requiresAction && (
                          <Chip 
                            label="Action Required" 
                            size="small" 
                            color="warning" 
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default WhatsAppNotifications;
