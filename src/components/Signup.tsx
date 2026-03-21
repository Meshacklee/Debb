import React from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { motion } from 'motion/react';

export const Signup: React.FC<{ onToggle: () => void; onSignup: () => void }> = ({ onToggle, onSignup }) => {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="fixed top-0 w-full flex justify-between items-center px-6 h-16 bg-surface/80 backdrop-blur-xl z-50">
        <h1 className="text-xl font-bold tracking-tight text-primary font-headline">Debby J</h1>
        <a href="#" className="text-sm font-bold text-primary hover:opacity-80">Help</a>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl w-full gap-12 items-center">
          {/* Hero Branding Section */}
          <div className="hidden lg:flex flex-col space-y-8 pr-12">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold tracking-widest uppercase">Join the Atelier</span>
              <h1 className="text-6xl font-extrabold font-headline text-primary leading-[1.1] tracking-tighter">
                Crafting your <br/>digital identity.
              </h1>
              <p className="text-lg text-on-surface-variant max-w-md leading-relaxed">
                Experience a curated approach to professional networking and project management. Tailored for those who value precision.
              </p>
            </div>
            <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/abstract/800/800" 
                alt="" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </div>
          </div>

          {/* Focus Plate */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-surface-container-lowest p-8 lg:p-10 rounded-[2rem] shadow-xl border border-outline-variant/10">
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl font-bold font-headline text-on-surface mb-2">Create Account</h2>
                <p className="text-on-surface-variant text-sm">Start your journey with a tailored profile.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); onSignup(); }} className="space-y-6">
                <Input label="Full Name" icon="person" placeholder="John Doe" required />
                <Input label="Email Address" icon="mail" placeholder="john@atelier.com" type="email" required />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Password" icon="lock" placeholder="••••••••" type="password" required />
                  <Input label="Confirm" icon="shield_lock" placeholder="••••••••" type="password" required />
                </div>

                <div className="flex items-center space-x-3 py-2">
                  <input type="checkbox" id="terms" className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" required />
                  <label htmlFor="terms" className="text-sm text-on-surface-variant">
                    I agree to the <a href="#" className="text-primary font-bold hover:underline">Terms and Conditions</a>
                  </label>
                </div>

                <Button type="submit" size="full" icon="arrow_forward">
                  Create Account
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-on-surface-variant text-sm">
                  Already have an account? 
                  <button onClick={onToggle} className="text-primary font-bold ml-1 hover:underline">Sign In</button>
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-8 opacity-20">
              <span className="material-symbols-outlined text-2xl">brush</span>
              <span className="material-symbols-outlined text-2xl">architecture</span>
              <span className="material-symbols-outlined text-2xl">palette</span>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
