import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const data = [
  { name: 'Mon', active: 4000, solved: 2400 },
  { name: 'Tue', active: 3000, solved: 1398 },
  { name: 'Wed', active: 2000, solved: 9800 },
  { name: 'Thu', active: 2780, solved: 3908 },
  { name: 'Fri', active: 1890, solved: 4800 },
];

const radarData = [
  { subject: 'Speed', A: 120, fullMark: 150 },
  { subject: 'Accuracy', A: 98, fullMark: 150 },
  { subject: 'Logic', A: 86, fullMark: 150 },
  { subject: 'Creativity', A: 99, fullMark: 150 },
  { subject: 'Stamina', A: 85, fullMark: 150 },
  { subject: 'Tech', A: 65, fullMark: 150 },
];

export const HoloBarChart: React.FC = () => {
  return (
    <div className="h-64 w-full glass-panel p-4 rounded-xl">
        <h4 className="text-sm uppercase text-gray-500 mb-2">Weekly Case Load</h4>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #00f0ff' }}
                itemStyle={{ color: '#00f0ff' }}
            />
            <Bar dataKey="active" fill="#00f0ff" barSize={20} />
            <Bar dataKey="solved" fill="#FF7F50" barSize={20} />
        </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export const HoloRadarChart: React.FC = () => {
    return (
      <div className="h-64 w-full glass-panel p-4 rounded-xl">
        <h4 className="text-sm uppercase text-gray-500 mb-2">Agent Skill Matrix</h4>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10 }} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#333" />
            <Radar name="Agent" dataKey="A" stroke="#FF7F50" fill="#FF7F50" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  };