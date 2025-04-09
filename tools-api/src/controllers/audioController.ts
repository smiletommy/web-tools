import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with original extension
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // Limit to 50MB
  },
  fileFilter: (req, file, cb) => {
    // Accept only audio files
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed'));
    }
  }
});

const execAsync = promisify(exec);

/**
 * Removes vocals from an audio file using FFmpeg
 * This is a simplified version using a basic center channel elimination technique
 */
export const removeVocals = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No audio file uploaded' });
    }
    
    const inputFile = req.file.path;
    const outputFileName = `instrumental_${path.basename(inputFile)}`;
    const outputDir = path.join(__dirname, '../../processed');
    
    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputFile = path.join(outputDir, outputFileName);
    
    // Use FFmpeg to remove vocals using the center channel elimination technique
    // This method works because vocals are often centered in the stereo mix
    const command = `ffmpeg -i "${inputFile}" -af "pan=stereo|c0=c0-c1|c1=c1-c0" "${outputFile}"`;
    
    await execAsync(command);
    
    // Send the processed file back to the client
    res.download(outputFile, `instrumental_${req.file.originalname}`, (err) => {
      if (err) {
        console.error('Error sending file:', err);
      }
      
      // Clean up temporary files
      setTimeout(() => {
        try {
          fs.unlinkSync(inputFile);
          fs.unlinkSync(outputFile);
        } catch (e) {
          console.error('Error cleaning up files:', e);
        }
      }, 60000); // Clean up after 1 minute
    });
  } catch (error) {
    console.error('Error processing audio:', error);
    res.status(500).json({ 
      message: 'Error processing audio file',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

/**
 * Simple endpoint to check if the audio processing system is available
 */
export const getStatus = async (req: Request, res: Response) => {
  try {
    // Check if FFmpeg is installed
    await execAsync('ffmpeg -version');
    res.json({ status: 'available', message: 'Audio processing system is available' });
  } catch (error) {
    res.status(503).json({ 
      status: 'unavailable', 
      message: 'Audio processing system is unavailable',
      details: 'FFmpeg is not installed or not in PATH' 
    });
  }
}; 