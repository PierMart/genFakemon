
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FakemonStats } from '../types';

interface StatChartProps {
  stats: FakemonStats;
}

const STAT_COLORS = {
  hp: '#ef4444', // red-500
  attack: '#f97316', // orange-500
  defense: '#eab308', // yellow-500
  'special-attack': '#8b5cf6', // violet-500
  'special-defense': '#3b82f6', // blue-500
  speed: '#ec4899', // pink-500
};

const StatChart: React.FC<StatChartProps> = ({ stats }) => {
  const data = [
    { name: 'HP', value: stats.hp, key: 'hp' },
    { name: 'ATK', value: stats.attack, key: 'attack' },
    { name: 'DEF', value: stats.defense, key: 'defense' },
    { name: 'SpA', value: stats.specialAttack, key: 'special-attack' },
    { name: 'SpD', value: stats.specialDefense, key: 'special-defense' },
    { name: 'SPD', value: stats.speed, key: 'speed' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/80 p-2 border border-gray-600 rounded-md">
          <p className="label text-white">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <XAxis type="number" hide domain={[0, 255]} />
          <YAxis dataKey="name" type="category" stroke="#9ca3af" tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(107, 114, 128, 0.2)' }} />
          <Bar dataKey="value" barSize={15} radius={[0, 10, 10, 0]}>
            {data.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={STAT_COLORS[entry.key as keyof typeof STAT_COLORS]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatChart;
