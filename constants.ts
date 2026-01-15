import { ArtistStyle, Mission, PlayerStats } from './types';

export const ARTIST_STYLES: ArtistStyle[] = [
  { id: 1, name: "Van Gogh", palette: ["bg-yellow-400", "text-blue-900"], font: "font-serif", bgGradient: "from-yellow-200 via-blue-300 to-blue-800", description: "Swirling energy and vivid contrasts." },
  { id: 2, name: "Picasso", palette: ["bg-red-400", "text-gray-900"], font: "font-mono", bgGradient: "from-red-300 via-orange-200 to-gray-500", description: "Cubist fragmentation and geometric forms." },
  { id: 3, name: "Monet", palette: ["bg-green-300", "text-green-900"], font: "font-serif", bgGradient: "from-green-200 via-teal-200 to-blue-200", description: "Soft light and impressionist strokes." },
  { id: 4, name: "Da Vinci", palette: ["bg-amber-100", "text-amber-900"], font: "font-serif", bgGradient: "from-amber-100 via-orange-100 to-yellow-100", description: "Renaissance parchment and sepia tones." },
  { id: 5, name: "Dali", palette: ["bg-purple-600", "text-yellow-200"], font: "font-sans", bgGradient: "from-purple-900 via-pink-600 to-yellow-500", description: "Surreal melting landscapes." },
  { id: 6, name: "Warhol", palette: ["bg-pink-500", "text-yellow-300"], font: "font-sans", bgGradient: "from-pink-500 via-yellow-400 to-cyan-400", description: "Pop art high contrast repetition." },
  { id: 7, name: "Mondrian", palette: ["bg-white", "text-black"], font: "font-mono", bgGradient: "from-white via-gray-100 to-white", description: "Primary colors and rigid grids." },
  { id: 8, name: "Hokusai", palette: ["bg-blue-600", "text-white"], font: "font-serif", bgGradient: "from-blue-100 via-blue-500 to-indigo-900", description: "The Great Wave, deep blues and whites." },
  { id: 9, name: "Rembrandt", palette: ["bg-black", "text-amber-500"], font: "font-serif", bgGradient: "from-gray-900 via-black to-amber-900", description: "Chiaroscuro, dramatic lighting." },
  { id: 10, name: "Klimt", palette: ["bg-yellow-500", "text-black"], font: "font-serif", bgGradient: "from-yellow-600 via-yellow-300 to-amber-700", description: "Golden leaf and decorative patterns." },
  { id: 11, name: "Pollock", palette: ["bg-gray-200", "text-black"], font: "font-mono", bgGradient: "from-gray-100 via-gray-300 to-gray-200", description: "Chaos, drips, and energetic splatter." },
  { id: 12, name: "Munch", palette: ["bg-orange-700", "text-blue-900"], font: "font-sans", bgGradient: "from-orange-500 via-red-700 to-black", description: "Existential dread and wavy lines." },
  { id: 13, name: "Matisse", palette: ["bg-blue-500", "text-white"], font: "font-sans", bgGradient: "from-blue-400 via-red-400 to-green-400", description: "Cut-outs and vibrant flat colors." },
  { id: 14, name: "Basquiat", palette: ["bg-black", "text-white"], font: "font-mono", bgGradient: "from-gray-900 via-gray-800 to-red-900", description: "Graffiti, crowns, and raw expression." },
  { id: 15, name: "Kahlo", palette: ["bg-green-600", "text-pink-200"], font: "font-serif", bgGradient: "from-green-700 via-emerald-500 to-pink-600", description: "Nature, foliage, and surreal self." },
  { id: 16, name: "Hopper", palette: ["bg-emerald-800", "text-yellow-100"], font: "font-sans", bgGradient: "from-emerald-900 via-green-800 to-yellow-900", description: "Urban isolation and harsh shadows." },
  { id: 17, name: "O'Keeffe", palette: ["bg-rose-200", "text-rose-900"], font: "font-serif", bgGradient: "from-rose-100 via-white to-orange-100", description: "Large flowers and flowing gradients." },
  { id: 18, name: "Banksy", palette: ["bg-gray-800", "text-white"], font: "font-mono", bgGradient: "from-gray-600 via-gray-900 to-black", description: "Stencil art, gritty urban walls." },
  { id: 19, name: "Magritte", palette: ["bg-blue-300", "text-gray-800"], font: "font-sans", bgGradient: "from-blue-200 via-white to-blue-200", description: "Floating objects and cloudy skies." },
  { id: 20, name: "Cyberpunk (Default)", palette: ["bg-slate-900", "text-cyan-400"], font: "font-mono", bgGradient: "from-slate-900 via-indigo-950 to-black", description: "Neon lights and high-tech darkness." }
];

export const INITIAL_PLAYER: PlayerStats = {
  name: "Agent 42",
  rank: "Field Agent",
  xp: 4500,
  rc: 120
};

export const MOCK_MISSIONS: Mission[] = [
  { id: 'M001', title: 'The Sierra Anomaly', difficulty: 'High', status: 'Available', xpReward: 1500, rcReward: 50 },
  { id: 'M002', title: 'Routine Audit: Batch 99', difficulty: 'Low', status: 'Completed', xpReward: 500, rcReward: 10 },
  { id: 'M003', title: 'Operation Pinpoint', difficulty: 'Medium', status: 'Active', xpReward: 1000, rcReward: 30 },
];

export const TRANSLATIONS = {
  en: {
    dashboard: "Mission Control",
    workbench: "Workbench",
    notes: "AI Note Keeper",
    architect: "Mission Architect",
    spin: "Spin Style",
    welcome: "Welcome back,",
    credits: "RC",
    xp: "XP",
    runAnalysis: "Run Analysis",
    upload: "Upload PDF/Text",
    magic: "AI Magic",
    transforming: "Transforming...",
  },
  'zh-TW': {
    dashboard: "任務控制中心",
    workbench: "工作台",
    notes: "AI 筆記助手",
    architect: "任務架構師",
    spin: "切換風格",
    welcome: "歡迎回來，",
    credits: "獎勵點數",
    xp: "經驗值",
    runAnalysis: "執行分析",
    upload: "上傳 PDF/文字",
    magic: "AI 魔法",
    transforming: "轉換中...",
  }
};