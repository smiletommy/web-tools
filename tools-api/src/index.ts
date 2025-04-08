import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Tools API' });
});

// Tools API routes
app.get('/api/tools', (req, res) => {
  res.json({
    tools: [
      {
        id: 'text-tools',
        title: 'Text Tools',
        description: 'Various text manipulation and analysis tools',
        category: 'text',
        tags: ['text', 'manipulation', 'analysis'],
      },
      {
        id: 'image-tools',
        title: 'Image Tools',
        description: 'Image processing and manipulation tools',
        category: 'image',
        tags: ['image', 'processing', 'manipulation'],
      },
      {
        id: 'code-tools',
        title: 'Code Tools',
        description: 'Development and coding utilities',
        category: 'code',
        tags: ['code', 'development', 'utilities'],
      },
      {
        id: 'data-tools',
        title: 'Data Tools',
        description: 'Data processing and analysis tools',
        category: 'data',
        tags: ['data', 'processing', 'analysis'],
      }
    ]
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 