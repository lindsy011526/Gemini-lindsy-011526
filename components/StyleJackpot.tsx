import React, { useState } from 'react';
import { ARTIST_STYLES } from '../constants';
import { ArtistStyle } from '../types';

interface StyleJackpotProps {
  onStyleChange: (style: ArtistStyle) => void;
  currentStyle: ArtistStyle;
  lang: 'en' | 'zh-TW';
}

const StyleJackpot: React.FC<StyleJackpotProps> = ({ onStyleChange, currentStyle, lang }) => {
  const [spinning, setSpinning] = useState(false);

  const handleSpin = () => {
    setSpinning(true);
    let spins = 0;
    const maxSpins = 20;
    const interval = setInterval(() => {
      const randomStyle = ARTIST_STYLES[Math.floor(Math.random() * ARTIST_STYLES.length)];
      onStyleChange(randomStyle);
      spins++;
      if (spins >= maxSpins) {
        clearInterval(interval);
        setSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="flex items-center space-x-4 p-4 glass-panel rounded-xl">
      <div className="flex flex-col">
        <span className="text-xs uppercase tracking-widest opacity-70 mb-1">
            {lang === 'en' ? 'Current Reality' : '當前現實'}
        </span>
        <h2 className={`text-2xl font-bold ${currentStyle.font} transition-all duration-300`}>
            {currentStyle.name}
        </h2>
        <p className="text-xs opacity-60 truncate max-w-[200px]">{currentStyle.description}</p>
      </div>
      
      <button
        onClick={handleSpin}
        disabled={spinning}
        className={`
            relative overflow-hidden group px-6 py-3 rounded-full font-bold
            transition-all duration-200 transform hover:scale-105 active:scale-95
            ${spinning ? 'opacity-80 cursor-wait' : 'opacity-100'}
            bg-gradient-to-r from-coral to-pink-600 text-white shadow-lg
        `}
      >
        <span className={spinning ? 'animate-pulse' : ''}>
           {lang === 'en' ? 'JACKPOT SPIN' : '風格輪盤'}
        </span>
      </button>
    </div>
  );
};

export default StyleJackpot;