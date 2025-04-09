import { ReactNode } from 'react';
import { 
  Box, 
  Container, 
  CssBaseline, 
  ThemeProvider,
  AppBar,
  Toolbar,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { theme as appTheme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
        }}
      >
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ 
                flexGrow: 1,
                color: 'text.primary',
                fontWeight: 700,
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              WebTools
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                color="primary"
                onClick={() => navigate('/text-tools')}
              >
                Text Tools
              </Button>
              <Button 
                color="primary"
                onClick={() => navigate('/vocal-remover')}
              >
                Vocal Remover
              </Button>
              <Button 
                color="primary"
                variant="contained"
                onClick={() => navigate('/')}
              >
                Home
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        
        <Container
          maxWidth="lg"
          sx={{
            py: 4,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Layout; 