import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ARTIST_STYLES, INITIAL_PLAYER, TRANSLATIONS, MOCK_MISSIONS } from './constants';
import { ArtistStyle, PlayerStats } from './types';
import StyleJackpot from './components/StyleJackpot';
import AiNoteKeeper from './components/AiNoteKeeper';
import NeuralWorkbench from './components/NeuralWorkbench';
import { HoloBarChart, HoloRadarChart } from './components/HoloCharts';

// Icons
const Icons = {
  Dashboard: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Workbench: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  Notes: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  Architect: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
};

// -- Components --

const NavLink = ({ to, icon: Icon, label, active }: any) => (
  <Link to={to} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${active ? 'bg-white/20 shadow-lg translate-x-1' : 'hover:bg-white/10 hover:translate-x-1'}`}>
    <Icon />
    <span className="font-medium">{label}</span>
  </Link>
);

const Dashboard = ({ lang }: { lang: 'en' | 'zh-TW' }) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition">
          <Icons.Dashboard />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-agent-blue">{lang === 'en' ? 'Mission Control' : '任務控制中心'}</h2>
        <p className="opacity-80 mb-6 max-w-md">{lang === 'en' ? 'Active missions requiring immediate GUDID analysis.' : '需要立即進行 GUDID 分析的活動任務。'}</p>
        <div className="space-y-3">
          {MOCK_MISSIONS.map(m => (
            <div key={m.id} className="p-3 bg-black/20 rounded-lg flex justify-between items-center hover:bg-black/40 transition cursor-pointer border-l-4 border-transparent hover:border-agent-blue">
              <div>
                <div className="font-bold">{m.title}</div>
                <div className="text-xs opacity-60">ID: {m.id} • Reward: {m.xpReward} XP</div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-bold ${m.difficulty === 'High' ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                {m.difficulty}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
         <HoloBarChart />
         <HoloRadarChart />
      </div>
    </div>
  </div>
);

const Workbench = ({ lang }: { lang: 'en' | 'zh-TW' }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center mb-4">
       <h2 className="text-2xl font-bold">{lang === 'en' ? 'Agent Workbench' : '代理工作台'}</h2>
       <button className="px-4 py-2 bg-agent-blue text-black font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transition">
         {lang === 'en' ? 'Deploy Pipeline' : '部署流程'}
       </button>
    </div>
    <NeuralWorkbench />
    <div className="grid grid-cols-3 gap-4">
        {[1,2,3,4,5,6].map(i => (
            <div key={i} className="glass-panel p-4 rounded-xl flex items-center justify-center border-dashed border-2 border-gray-600 hover:border-agent-blue transition cursor-grab active:cursor-grabbing">
                <span className="opacity-50 text-sm">Agent Slot {i}</span>
            </div>
        ))}
    </div>
  </div>
);

// -- Main App --

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<'en' | 'zh-TW'>('en');
  const [style, setStyle] = useState<ArtistStyle>(ARTIST_STYLES[19]); // Default Cyberpunk
  const [player, setPlayer] = useState<PlayerStats>(INITIAL_PLAYER);

  // Apply dark mode class to html
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleLang = () => setLang(prev => prev === 'en' ? 'zh-TW' : 'en');

  // Dynamic Background
  const bgGradient = style.bgGradient;

  return (
    <Router>
      <div className={`min-h-screen flex text-slate-100 font-sans transition-colors duration-500 overflow-hidden ${style.font} bg-gradient-to-br ${bgGradient} ${isDark ? '' : 'text-slate-900'}`}>
        
        {/* Dynamic Overlay to blend colors */}
        <div className={`absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay ${isDark ? 'bg-black' : 'bg-white'}`}></div>

        {/* Sidebar */}
        <nav className={`w-20 lg:w-64 flex flex-col justify-between p-4 glass-panel z-10 m-4 rounded-2xl ${isDark ? 'border-gray-700' : 'border-white/40'}`}>
          <div className="space-y-8">
            <div className="flex items-center space-x-3 px-2">
               <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg animate-pulse-fast">
                 <span className="text-xl font-bold text-white">AQ</span>
               </div>
               <span className="text-xl font-bold hidden lg:block tracking-wider">AgentQuest</span>
            </div>
            
            <div className="space-y-2">
              <NavLinkWithLocation to="/" icon={Icons.Dashboard} label={TRANSLATIONS[lang].dashboard} />
              <NavLinkWithLocation to="/workbench" icon={Icons.Workbench} label={TRANSLATIONS[lang].workbench} />
              <NavLinkWithLocation to="/notes" icon={Icons.Notes} label={TRANSLATIONS[lang].notes} />
              <NavLinkWithLocation to="/architect" icon={Icons.Architect} label={TRANSLATIONS[lang].architect} />
            </div>
          </div>

          <div className="space-y-4">
             {/* Stats */}
             <div className="glass-panel p-3 rounded-xl hidden lg:block">
                <div className="text-xs uppercase opacity-60 mb-1">{player.rank}</div>
                <div className="flex justify-between items-center">
                    <span className="font-bold">{player.name}</span>
                    <span className="text-xs bg-agent-blue text-black px-1 rounded">Lvl 5</span>
                </div>
                <div className="w-full bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-coral h-full w-[75%]"></div>
                </div>
                <div className="flex justify-between text-xs mt-1 opacity-70">
                    <span>{player.xp} XP</span>
                    <span>{player.rc} RC</span>
                </div>
             </div>

             {/* Toggles */}
             <div className="flex flex-col gap-2">
                <button onClick={toggleLang} className="p-2 rounded-lg hover:bg-white/10 transition text-xs font-bold border border-white/10">
                    {lang === 'en' ? '🌐 EN' : '🌐 中文'}
                </button>
                <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-white/10 transition text-xs font-bold border border-white/10">
                    {isDark ? '☀️ Light' : '🌙 Dark'}
                </button>
             </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto relative z-0">
           {/* Header with Jackpot */}
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
               <div>
                  <h1 className="text-4xl font-bold mb-1 opacity-90 drop-shadow-md">
                    {TRANSLATIONS[lang].welcome} {player.name}
                  </h1>
                  <p className="opacity-60">{new Date().toLocaleDateString()}</p>
               </div>
               <StyleJackpot onStyleChange={setStyle} currentStyle={style} lang={lang} />
           </div>

           {/* Routes */}
           <div className={`transition-all duration-500 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
             <Routes>
               <Route path="/" element={<Dashboard lang={lang} />} />
               <Route path="/workbench" element={<Workbench lang={lang} />} />
               <Route path="/notes" element={<AiNoteKeeper lang={lang} />} />
               <Route path="/architect" element={<div className="glass-panel p-10 text-center rounded-2xl text-2xl font-bold opacity-50">Mission Architect: Access Restricted (Level 10 Required)</div>} />
             </Routes>
           </div>
        </main>
      </div>
    </Router>
  );
};

// Helper for active link styling
const NavLinkWithLocation = (props: any) => {
    const location = useLocation();
    const isActive = location.pathname === props.to;
    return <NavLink {...props} active={isActive} />;
}

export default App;