import React, { useState, useRef } from 'react';
import { GalleryItem } from '../types';
import { Button } from './Button';
import { motion, AnimatePresence } from 'motion/react';

export const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newItem: GalleryItem = {
          id: Math.random().toString(36).substr(2, 9),
          url: event.target?.result as string,
          title: file.name,
          type: file.type,
          timestamp: Date.now(),
        };
        setItems(prev => [newItem, ...prev]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <section className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-2xl font-extrabold font-headline tracking-tight text-on-surface">Design Gallery</h3>
          <p className="text-on-surface-variant">Showcase your latest creative works</p>
        </div>
        <Button 
          variant="primary" 
          icon="add_photo_alternate" 
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Design
        </Button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          className="hidden" 
          accept="image/*" 
          multiple 
        />
      </div>

      {items.length === 0 ? (
        <div className="border-2 border-dashed border-outline-variant rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-outline">
            <span className="material-symbols-outlined text-4xl">imagesmode</span>
          </div>
          <div>
            <p className="font-bold text-on-surface">No designs uploaded yet</p>
            <p className="text-sm text-on-surface-variant">Upload your JPG or PNG files to build your portfolio</p>
          </div>
          <Button variant="ghost" onClick={() => fileInputRef.current?.click()}>
            Browse Files
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative aspect-square bg-surface-container-low rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <p className="text-white font-bold text-sm truncate">{item.title}</p>
                  <button 
                    onClick={() => removeImage(item.id)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-error transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};
