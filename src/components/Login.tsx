import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { motion } from 'motion/react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

export const Login: React.FC<{ onToggle: () => void; onLogin: () => void }> = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setError(null);
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'An error occurred during Google login.');
    }
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Manual login error:', error);
      setError(error.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Background Section */}
      <div className="relative h-[353px] w-full overflow-hidden bg-primary">
        <img 
          src="https://picsum.photos/seed/office/1920/1080?blur=2" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 pt-12">
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter text-on-primary mb-2">Debby J</h1>
          <p className="text-on-primary/80 font-medium tracking-wide uppercase text-xs">Designing Digital Excellence</p>
        </div>
      </div>

      {/* Login Container */}
      <main className="flex-grow flex items-start justify-center -mt-24 px-6 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl p-8 md:p-12 relative z-20"
        >
          <header className="mb-10 text-center md:text-left">
            <h2 className="font-headline text-3xl font-bold text-primary tracking-tight mb-2">Welcome Back</h2>
            <p className="text-on-surface-variant">Sign in to your curated workspace.</p>
          </header>
          
          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl text-error text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleManualLogin} className="space-y-6">
            <Input 
              label="Email Address" 
              icon="mail" 
              placeholder="name@atelier.com" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-xs font-bold tracking-widest text-on-surface-variant uppercase">Password</label>
                <a href="#" className="text-xs font-bold text-primary hover:opacity-70">Forgot Password?</a>
              </div>
              <Input 
                icon="lock" 
                placeholder="••••••••" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <Button type="submit" size="full" icon="arrow_forward" className="mt-4" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant/30"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-outline bg-surface-container-lowest px-4 font-bold">Or continue with</div>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleGoogleLogin} 
              size="full" 
              icon="login" 
              className="bg-white text-black border border-outline-variant hover:bg-surface-container-low"
            >
              Sign in with Google
            </Button>
          </div>

          <div className="mt-12 text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant/30"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-outline bg-surface-container-lowest px-4 font-bold">New here?</div>
            </div>
            <Button variant="secondary" size="full" onClick={onToggle}>
              Create your account
            </Button>
          </div>
        </motion.div>
      </main>

      <footer className="py-8 px-6 text-center">
        <p className="text-[10px] text-on-surface-variant/60 font-bold tracking-widest uppercase">
          © 2024 Atelier Digital. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
