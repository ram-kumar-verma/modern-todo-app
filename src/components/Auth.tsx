import React from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { GlassCard } from './GlassCard';
import { LogIn, Mail } from 'lucide-react';

export const Auth: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isRegistering, setIsRegistering] = React.useState(false);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
      alert("Google Sign-In failed. Please check your Firebase config.");
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error(error);
      alert("Auth failed. Please check your Firebase config.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">Focus</h1>
          <p className="text-on-surface-variant">Illuminate your productivity</p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center mb-4">{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Email</label>
              <input 
                type="email" 
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-surface/20 border border-white/10 rounded-xl p-3 text-on-surface focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-surface/20 border border-white/10 rounded-xl p-3 text-on-surface focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <button type="submit" className="w-full bg-primary text-on-primary font-bold py-3 rounded-xl mt-2 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(192,193,255,0.3)]">
              <Mail size={18} />
              {isRegistering ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-on-surface-variant">Or continue with</span></div>
          </div>

          <button 
            onClick={handleGoogleSignIn}
            className="w-full bg-white/5 border border-white/10 text-on-surface font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
          >
            <LogIn size={18} />
            Google
          </button>

          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="w-full text-primary text-sm mt-6 hover:underline"
          >
            {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </GlassCard>
      </div>
    </div>
  );
};
