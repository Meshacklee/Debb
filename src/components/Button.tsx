import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'full';
  icon?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className,
  ...props
}) => {
  const variants = {
    primary: 'bg-primary text-on-primary hover:opacity-90 shadow-md',
    secondary: 'bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed',
    tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed hover:opacity-90',
    ghost: 'text-primary hover:bg-primary/5',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    full: 'w-full py-4 px-6',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
      {icon && <span className="material-symbols-outlined text-lg">{icon}</span>}
    </button>
  );
};
