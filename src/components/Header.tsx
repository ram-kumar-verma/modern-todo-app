import React from 'react';
import { Bell } from 'lucide-react';

interface HeaderProps {
  user: any;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-surface/10 backdrop-blur-[20px] border-b border-white/10 shadow-[0_20px_20px_rgba(192,193,255,0.15)] sticky top-0 z-40">
      <div className="flex justify-between items-center w-full px-margin-mobile py-4 max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-white/20 object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full border border-white/20 bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'A'}
            </div>
          )}
        </div>
        <h1 className="font-sans text-2xl text-primary tracking-tight font-bold">Focus</h1>
        <button className="text-primary hover:opacity-80 transition-opacity active:scale-95 duration-200">
          <Bell size={24} />
        </button>
      </div>
    </header>
  );
};
