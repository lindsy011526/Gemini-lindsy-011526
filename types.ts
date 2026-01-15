export type Language = 'en' | 'zh-TW';

export interface ArtistStyle {
  id: number;
  name: string;
  palette: string[]; // tailwind color classes or hex
  font: string;
  bgGradient: string;
  description: string;
}

export interface PlayerStats {
  rank: string;
  xp: number;
  rc: number;
  name: string;
}

export interface Note {
  id: string;
  title: string;
  content: string; // Markdown
  tags: string[];
  lastModified: number;
}

export interface Mission {
  id: string;
  title: string;
  difficulty: 'Low' | 'Medium' | 'High';
  status: 'Available' | 'Active' | 'Completed';
  xpReward: number;
  rcReward: number;
}

// AI Magics types
export type MagicType = 'SUMMARIZE' | 'ACTION_ITEMS' | 'CRITIQUE' | 'POETIFY' | 'ELI5' | 'TRANSLATE_ZH';