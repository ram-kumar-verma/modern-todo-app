import React from 'react';
import { GlassCard } from './GlassCard';
import { TrendingUp } from 'lucide-react';

interface ProgressBarProps {
  percentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mb-1">Daily Progress</span>
          <span className="text-3xl text-primary font-bold">{Math.round(percentage)}%</span>
        </div>
        <TrendingUp className="text-primary/80 mb-1" size={32} />
      </div>
      <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden mt-4 border border-white/5">
        <div 
          className="h-full bg-gradient-to-r from-primary to-inverse-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(192,193,255,0.5)]"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </GlassCard>
  );
};
