import React, { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Paper,
  Container,
  LinearProgress,
} from '@mui/material';
import { 
  CloudUpload as UploadIcon,
  Download as DownloadIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
} from '@mui/icons-material';

const VocalRemover = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      // Check if the file is an audio file
      if (!selectedFile.type.startsWith('audio/')) {
        setError('Please upload an audio file (MP3, WAV, etc.)');
        return;
      }
      
      setFile(selectedFile);
      setError(null);
      // Reset processed file if a new file is uploaded
      setProcessedFile(null);
      setProgress(0);
    }
  };

  const handleProcessFile = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setError(null);
    setProgress(0);
    
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('audioFile', file);
      
      // Make the API request to the backend
      const response = await fetch('http://localhost:5000/api/audio/remove-vocals', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }
      
      // Process the response - expect a blob of the processed audio
      const result = await response.blob();
      const fileUrl = URL.createObjectURL(result);
      setProcessedFile(fileUrl);
      
      // Set progress to 100% on success
      setProgress(100);
    } catch (err) {
      console.error('Processing error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to process the audio file. Please try again.'
      );
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying && audioRef) {
      audioRef.pause();
      setIsPlaying(false);
    } else if (processedFile) {
      if (!audioRef) {
        const audio = new Audio(processedFile);
        audio.onended = () => setIsPlaying(false);
        setAudioRef(audio);
        audio.play();
      } else {
        audioRef.play();
      }
      setIsPlaying(true);
    }
  };

  const handleDownload = () => {
    if (processedFile) {
      const a = document.createElement('a');
      a.href = processedFile;
      a.download = `instrumental_${file?.name || 'track'}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Container maxWidth="lg">
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
          Vocal Remover
        </Typography>
        
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          Upload a music track to remove vocals and create an instrumental version.
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Upload Music Track
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  border: '2px dashed #ccc',
                  borderRadius: 2,
                  py: 4,
                  px: 2,
                  mb: 3,
                  textAlign: 'center'
                }}>
                  <input
                    type="file"
                    accept="audio/*"
                    id="audio-file-upload"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  <label htmlFor="audio-file-upload">
                    <Button
                      component="span"
                      variant="contained"
                      startIcon={<UploadIcon />}
                      sx={{ mb: 2 }}
                    >
                      Select Audio File
                    </Button>
                  </label>
                  
                  {file && (
                    <Typography variant="body2">
                      Selected file: {file.name}
                    </Typography>
                  )}
                </Box>
                
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
                
                {isProcessing && (
                  <Box sx={{ width: '100%', mb: 2 }}>
                    <LinearProgress variant="determinate" value={progress} />
                    <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                      Processing audio... {progress}%
                    </Typography>
                  </Box>
                )}
                
                <Button
                  variant="contained"
                  fullWidth
                  disabled={!file || isProcessing}
                  onClick={handleProcessFile}
                >
                  {isProcessing ? (
                    <>
                      <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
                      Processing...
                    </>
                  ) : (
                    'Remove Vocals'
                  )}
                </Button>
              </CardContent>
            </Card>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Instrumental Track
                </Typography>
                
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    minHeight: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3
                  }}
                >
                  {processedFile ? (
                    <>
                      <Typography variant="body1" gutterBottom>
                        Vocals removed successfully!
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Button
                          variant="outlined"
                          startIcon={isPlaying ? <StopIcon /> : <PlayIcon />}
                          onClick={handlePlayPause}
                        >
                          {isPlaying ? 'Stop' : 'Play'}
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<DownloadIcon />}
                          onClick={handleDownload}
                        >
                          Download
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <Typography color="text.secondary">
                      Processed audio will appear here...
                    </Typography>
                  )}
                </Paper>
                
                <Alert severity="info">
                  Note: For best results, use high-quality audio files with clear vocals.
                </Alert>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default VocalRemover; 