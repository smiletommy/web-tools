import express from 'express';
import { removeVocals, upload, getStatus } from '../controllers/audioController';

const router = express.Router();

// Check if audio processing is available
router.get('/status', getStatus);

// Process audio to remove vocals
router.post('/remove-vocals', upload.single('audioFile'), removeVocals);

export default router; 