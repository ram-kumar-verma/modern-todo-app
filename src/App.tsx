import { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';
import { Task, Priority } from './types';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { TaskItem } from './components/TaskItem';
import { TaskForm } from './components/TaskForm';
import { Auth } from './components/Auth';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskData: Task[] = [];
      snapshot.forEach((doc) => {
        taskData.push({ id: doc.id, ...doc.data() } as Task);
      });
      setTasks(taskData);
    }, (error) => {
      console.error("Firestore error:", error);
      // Fallback to local storage if firestore fails (e.g. invalid config)
      const local = localStorage.getItem(`tasks_${user.uid}`);
      if (local) setTasks(JSON.parse(local));
    });

    return () => unsubscribe();
  }, [user]);

  const addTask = async (text: string, priority: Priority, category: string) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'tasks'), {
        text,
        priority,
        category,
        completed: false,
        userId: user.uid,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error(error);
      // Fallback for demo
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        text,
        priority,
        category,
        completed: false,
        userId: user.uid,
        createdAt: new Date()
      };
      const updated = [newTask, ...tasks];
      setTasks(updated);
      localStorage.setItem(`tasks_${user.uid}`, JSON.stringify(updated));
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    try {
      await updateDoc(doc(db, 'tasks', id), {
        completed: !task.completed
      });
    } catch (error) {
      console.error(error);
      const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
      setTasks(updated);
      localStorage.setItem(`tasks_${user.uid}`, JSON.stringify(updated));
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (error) {
      console.error(error);
      const updated = tasks.filter(t => t.id !== id);
      setTasks(updated);
      localStorage.setItem(`tasks_${user.uid}`, JSON.stringify(updated));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="bg-background text-on-background min-h-screen relative overflow-x-hidden">
      {/* Ambient Background Light Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[100px] opacity-60 pointer-events-none z-0"></div>
      <div className="fixed bottom-[10%] right-[-10%] w-[60vw] h-[60vw] bg-inverse-primary/10 rounded-full blur-[120px] opacity-50 pointer-events-none z-0"></div>

      <Header user={user} />

      <main className="relative z-10 px-margin-mobile pt-6 pb-[120px] max-w-2xl mx-auto flex flex-col gap-8">
        <section className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold text-on-surface">Hello, {user.displayName?.split(' ')[0] || 'User'}</h2>
          <p className="text-on-surface-variant/80">You have {tasks.filter(t => !t.completed).length} tasks to illuminate today.</p>
        </section>

        <ProgressBar percentage={progressPercentage} />

        <section className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <TaskItem 
                  task={task} 
                  onToggle={toggleTask} 
                  onDelete={deleteTask} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
          {tasks.length === 0 && (
            <div className="text-center py-12 text-on-surface-variant/40 italic">
              No tasks found. Start by adding one below.
            </div>
          )}
        </section>
      </main>

      <TaskForm onAdd={addTask} />

      {/* Mobile Bottom Nav */}
      <nav className="bg-surface/15 backdrop-blur-3xl border-t border-white/10 fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 rounded-t-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
        <button className="flex flex-col items-center text-primary font-bold"><Check size={24} /><span className="text-[10px] uppercase mt-1">Tasks</span></button>
        <button className="flex flex-col items-center text-on-surface-variant/60"><User size={24} /><span className="text-[10px] uppercase mt-1">Profile</span></button>
      </nav>
    </div>
  );
}

const Check = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
);

export default App;
