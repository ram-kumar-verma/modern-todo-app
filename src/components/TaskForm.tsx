import React, { useState } from 'react';
import { Priority } from '../types';
import { Plus, X } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskFormProps {
  onAdd: (text: string, priority: Priority, category: string) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [category, setCategory] = useState('Work');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, priority, category);
      setText('');
      setIsOpen(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[100px] right-6 w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-[0_0_24px_rgba(192,193,255,0.6)] hover:shadow-[0_0_32px_rgba(192,193,255,0.8)] border border-white/20 z-50 active:scale-90 transition-all duration-300"
      >
        <Plus size={32} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="w-full max-w-lg"
            >
              <GlassCard className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-primary">New Task</h3>
                  <button onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="What needs to be done?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full bg-surface/20 border border-white/10 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Priority</label>
                    <div className="flex gap-2">
                      {(['High', 'Medium', 'Low'] as Priority[]).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPriority(p)}
                          className={`flex-1 py-2 rounded-lg border transition-all ${priority === p ? 'bg-primary/20 border-primary text-primary' : 'bg-surface/10 border-white/5 text-on-surface-variant'}`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Category</label>
                    <div className="flex gap-2 flex-wrap">
                      {['Work', 'Personal', 'Health', 'Finance'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCategory(c)}
                          className={`px-4 py-2 rounded-full border text-xs transition-all ${category === c ? 'bg-primary/20 border-primary text-primary' : 'bg-surface/10 border-white/5 text-on-surface-variant'}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(192,193,255,0.4)] hover:shadow-[0_0_30px_rgba(192,193,255,0.6)] active:scale-95 transition-all"
                  >
                    Illuminate Task
                  </button>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
