import React from 'react';
import { cn } from '../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, icon, error, className, id, ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-xs font-bold tracking-widest text-on-surface-variant ml-1 uppercase">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={cn(
            'w-full py-4 bg-surface-container-high border-none rounded-lg focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline/60 text-on-surface font-medium',
            icon ? 'pl-12 pr-4' : 'px-4',
            error && 'ring-1 ring-error',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-error ml-1">{error}</p>}
    </div>
  );
};
