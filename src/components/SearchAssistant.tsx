import React, { useState } from 'react';
import { searchGrounding, generateSpeech } from '../services/geminiService';
import { Button } from './Button';
import { Input } from './Input';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

export const SearchAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; sources: any[] } | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResult(null);
    setAudioUrl(null);
    
    try {
      const data = await searchGrounding(query);
      setResult(data);
      
      // Automatically generate speech for the summary
      const speech = await generateSpeech(data.text.slice(0, 500)); // Limit for TTS
      if (speech) setAudioUrl(speech);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface-container-low rounded-2xl p-6 shadow-sm border border-outline-variant/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">google</span>
        </div>
        <div>
          <h3 className="font-headline font-bold text-lg">Search Grounding</h3>
          <p className="text-xs text-on-surface-variant">Get real-time insights powered by Google Search</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <Input
          placeholder="Ask anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 py-3"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !query.trim()} className="h-[52px]">
          {isLoading ? <span className="material-symbols-outlined animate-spin">sync</span> : 'Ask'}
        </Button>
      </form>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="prose prose-sm dark:prose-invert max-w-none text-on-surface-variant">
              <ReactMarkdown>{result.text}</ReactMarkdown>
            </div>

            {audioUrl && (
              <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl">
                <span className="material-symbols-outlined text-primary">audio_spark</span>
                <audio src={audioUrl} controls className="h-8 flex-1" />
              </div>
            )}

            {result.sources.length > 0 && (
              <div className="pt-4 border-t border-outline-variant/20">
                <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Sources</p>
                <div className="flex flex-wrap gap-2">
                  {result.sources.map((source: any, i: number) => (
                    <a
                      key={i}
                      href={source.web?.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] bg-surface-container-highest px-2 py-1 rounded hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {source.web?.title || 'Source'}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
