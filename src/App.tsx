import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { VoiceAssistant } from './components/VoiceAssistant';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type Page = 'login' | 'signup' | 'dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleLogin = () => setCurrentPage('dashboard');
  const handleSignup = () => setCurrentPage('dashboard');
  const handleLogout = () => setCurrentPage('login');

  const ThemeToggle = () => (
    <button 
      onClick={toggleDarkMode}
      className="material-symbols-outlined text-primary hover:bg-primary/5 transition-colors p-2 rounded-full"
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? 'light_mode' : 'dark_mode'}
    </button>
  );

  if (currentPage === 'login') {
    return (
      <div className={cn(isDarkMode && 'dark')}>
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <Login onToggle={() => setCurrentPage('signup')} onLogin={handleLogin} />
      </div>
    );
  }

  if (currentPage === 'signup') {
    return (
      <div className={cn(isDarkMode && 'dark')}>
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <Signup onToggle={() => setCurrentPage('login')} onSignup={handleSignup} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface pb-32 transition-colors duration-300">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full flex justify-between items-center px-6 h-16 bg-surface/80 backdrop-blur-xl z-50 border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="material-symbols-outlined text-primary hover:bg-primary/5 transition-colors p-2 rounded-full"
          >
            menu
          </button>
          <h1 className="text-xl font-bold tracking-tight text-primary font-headline">Debby J</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={handleLogout}
            className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30 hover:ring-2 ring-primary/20 transition-all"
          >
            <img 
              alt="User profile" 
              className="w-full h-full object-cover" 
              src="https://i.pravatar.cc/150?u=julian"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-6 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Dashboard />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Voice Assistant Floating Action */}
      <VoiceAssistant />

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full z-40 flex justify-around items-center pt-2 pb-8 px-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border-t border-outline-variant/10">
        <NavItem icon="home" label="Home" active />
        <NavItem icon="search" label="Explore" />
        <NavItem icon="bookmark" label="Saved" />
        <NavItem icon="person" label="Profile" />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) {
  return (
    <a 
      href="#" 
      className={cn(
        "flex flex-col items-center justify-center px-5 py-2 transition-all duration-200 rounded-2xl",
        active ? "bg-primary/10 text-primary scale-105" : "text-outline hover:text-on-surface"
      )}
    >
      <span className={cn("material-symbols-outlined", active && "fill-icon")}>{icon}</span>
      <span className="text-[10px] font-bold uppercase tracking-widest mt-1">{label}</span>
    </a>
  );
}

