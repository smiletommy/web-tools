import { useNavigate } from 'react-router-dom';
import { Stack, Card, CardContent, Typography, CardActionArea, Container, Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Tool, fetchTools } from '../data/tools';

const Home = () => {
  const navigate = useNavigate();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTools = async () => {
      try {
        setLoading(true);
        const data = await fetchTools();
        setTools(data);
        setError(null);
      } catch (err) {
        setError('Failed to load tools. Using fallback data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTools();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Typography color="error" sx={{ mb: 3 }}>
          {error}
        </Typography>
      )}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 4,
        }}
      >
        {tools.map((tool) => (
          <Card 
            key={tool.id}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}
          >
            <CardActionArea 
              onClick={() => navigate(tool.path)}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
              }}
            >
              <tool.Icon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <CardContent sx={{ textAlign: 'center', flexGrow: 1, width: '100%' }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {tool.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tool.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Home; 