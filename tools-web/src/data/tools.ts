import { 
  TextFields as TextIcon,
  Image as ImageIcon,
  Code as CodeIcon,
  DataObject as DataIcon,
  MusicNote as MusicIcon,
  AudioFile as AudioIcon,
} from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';
import React from 'react';

export interface Tool {
  id: string;
  title: string;
  description: string;
  path: string;
  Icon: React.ComponentType<SvgIconProps>;
  category: string;
  tags: string[];
}

const iconMap: Record<string, React.ComponentType<SvgIconProps>> = {
  'text-tools': TextIcon,
  'image-tools': ImageIcon,
  'code-tools': CodeIcon,
  'data-tools': DataIcon,
  'vocal-remover': MusicIcon,
  'audio-tools': AudioIcon,
};

// Local fallback tools data
const fallbackTools: Tool[] = [
  {
    id: 'text-tools',
    title: 'Text Tools',
    description: 'Various text manipulation and analysis tools',
    path: '/text-tools',
    Icon: TextIcon,
    category: 'text',
    tags: ['text', 'manipulation', 'analysis'],
  },
  {
    id: 'image-tools',
    title: 'Image Tools',
    description: 'Image processing and manipulation tools',
    path: '/image-tools',
    Icon: ImageIcon,
    category: 'image',
    tags: ['image', 'processing', 'manipulation'],
  },
  {
    id: 'code-tools',
    title: 'Code Tools',
    description: 'Development and coding utilities',
    path: '/code-tools',
    Icon: CodeIcon,
    category: 'code',
    tags: ['code', 'development', 'utilities'],
  },
  {
    id: 'data-tools',
    title: 'Data Tools',
    description: 'Data processing and analysis tools',
    path: '/data-tools',
    Icon: DataIcon,
    category: 'data',
    tags: ['data', 'processing', 'analysis'],
  },
  {
    id: 'audio-tools',
    title: 'Audio Tools',
    description: 'Audio processing and manipulation tools',
    path: '/audio-tools',
    Icon: AudioIcon,
    category: 'audio',
    tags: ['audio', 'processing', 'music'],
  },
  {
    id: 'vocal-remover',
    title: 'Vocal Remover',
    description: 'Remove vocals from music tracks to create instrumental versions',
    path: '/vocal-remover',
    Icon: MusicIcon,
    category: 'audio',
    tags: ['music', 'audio', 'vocals', 'instrumental', 'karaoke'],
  },
];

// Fetch tools from API
export const fetchTools = async (): Promise<Tool[]> => {
  try {
    const response = await fetch('http://localhost:5000/api/tools');
    if (!response.ok) {
      throw new Error('Failed to fetch tools');
    }
    const data = await response.json();
    
    // Add icon and path to each tool
    return data.tools.map((tool: any) => ({
      ...tool,
      path: `/${tool.id}`,
      Icon: iconMap[tool.id] || DataIcon,
    }));
  } catch (error) {
    console.error('Error fetching tools:', error);
    return fallbackTools;
  }
};

// Export the default tools for now, but components should use the fetchTools function
export const tools = fallbackTools;

// Helper functions for filtering and searching tools
export const getToolsByCategory = (category: string) => {
  return tools.filter(tool => tool.category === category);
};

export const getToolsByTag = (tag: string) => {
  return tools.filter(tool => tool.tags.includes(tag));
};

export const searchTools = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return tools.filter(tool => 
    tool.title.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}; 