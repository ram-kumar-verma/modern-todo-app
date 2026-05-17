import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative bg-surface/10 backdrop-blur-[20px] border border-white/10 rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)] ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-xl"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
