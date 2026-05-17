import React from 'react';
import type { Task } from '../types';
import { Check, Briefcase, Heart, User, Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const priorityColors = {
    High: 'bg-error',
    Medium: 'bg-tertiary',
    Low: 'bg-primary'
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'work': return <Briefcase size={14} />;
      case 'health': return <Heart size={14} />;
      case 'personal': return <User size={14} />;
      default: return <Briefcase size={14} />;
    }
  };

  return (
    <div className={`relative group flex items-center gap-4 bg-surface/10 backdrop-blur-[20px] border border-white/10 rounded-xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:bg-surface/20 transition-all duration-300 pl-5 ${task.completed ? 'opacity-60' : ''}`}>
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[60%] ${priorityColors[task.priority]} rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.2)]`}></div>
      
      <button 
        onClick={() => onToggle(task.id)}
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 active:scale-90 ${task.completed ? 'bg-primary border-none shadow-[0_0_12px_rgba(192,193,255,0.4)]' : 'border-outline/40 bg-surface/20 hover:border-primary/60'}`}
      >
        {task.completed && <Check size={16} className="text-on-primary font-bold" />}
      </button>

      <div className="flex-1 flex flex-col gap-1">
        <span className={`font-body-lg text-body-lg text-on-surface font-medium ${task.completed ? 'line-through decoration-white/30' : ''}`}>
          {task.text}
        </span>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/5 backdrop-blur-[10px] px-2 py-0.5 rounded-full border border-white/5">
            <span className={`text-[10px] ${priorityColors[task.priority].replace('bg-', 'text-')}`}>
              {getCategoryIcon(task.category)}
            </span>
            <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">{task.category}</span>
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${priorityColors[task.priority].replace('bg-', 'text-')}`}>
            {task.priority}
          </span>
        </div>
      </div>

      <button 
        onClick={() => onDelete(task.id)}
        className="text-on-surface-variant/40 hover:text-error transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};
