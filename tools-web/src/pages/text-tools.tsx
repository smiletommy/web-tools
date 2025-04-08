import { useState } from 'react';
import {
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material';
import { 
  ContentCopy as CopyIcon,
  Delete as ClearIcon,
} from '@mui/icons-material';

const TextTools = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const convertToUppercase = () => {
    setOutputText(inputText.toUpperCase());
  };

  const convertToLowercase = () => {
    setOutputText(inputText.toLowerCase());
  };

  const countCharacters = () => {
    setOutputText(`Character count: ${inputText.length}`);
  };

  const clearText = () => {
    setInputText('');
    setOutputText('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography 
        variant="h1" 
        component="h1" 
        gutterBottom
        sx={{ 
          background: 'linear-gradient(45deg, #6366f1 30%, #10b981 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 800,
        }}
      >
        Text Tools
      </Typography>
      
      <Grid container spacing={4}>
        <Grid xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Input
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={8}
                label="Enter your text here"
                value={inputText}
                onChange={handleTextChange}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  onClick={convertToUppercase}
                >
                  Uppercase
                </Button>
                <Button
                  variant="contained"
                  onClick={convertToLowercase}
                >
                  Lowercase
                </Button>
                <Button
                  variant="contained"
                  onClick={countCharacters}
                >
                  Count Characters
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<ClearIcon />}
                  onClick={clearText}
                >
                  Clear
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Output
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<CopyIcon />}
                  onClick={copyToClipboard}
                  disabled={!outputText}
                >
                  Copy
                </Button>
              </Box>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  minHeight: 200,
                  bgcolor: 'background.default',
                  overflow: 'auto',
                }}
              >
                <Typography>
                  {outputText || 'Your converted text will appear here...'}
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TextTools; 