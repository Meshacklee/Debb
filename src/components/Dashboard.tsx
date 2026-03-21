import React from 'react';
import { METRICS, ACTIVITIES } from '../constants';
import { Button } from './Button';
import { SearchAssistant } from './SearchAssistant';
import { motion } from 'motion/react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Welcoming Header */}
      <section>
        <p className="text-on-surface-variant font-medium mb-1">Monday, 24 May</p>
        <h2 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-primary">
          Good morning, Debby.
        </h2>
        <div className="mt-4 flex gap-3">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-xs font-semibold">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            Curated for you
          </span>
        </div>
      </section>

      {/* Bento Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Project Velocity Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative overflow-hidden group"
        >
          <div className="relative z-10">
            <h3 className="text-2xl font-bold font-headline mb-2">Project Velocity</h3>
            <p className="text-on-surface-variant text-sm mb-6">Your creative output is up 12% this week.</p>
            <div className="h-48 w-full bg-surface-container-low rounded-lg flex items-end justify-between p-4 gap-2">
              {[40, 65, 50, 85, 70, 95].map((h, i) => (
                <div 
                  key={i}
                  className={i === 5 ? "w-full bg-primary rounded-t-md shadow-lg" : "w-full bg-primary/10 rounded-t-md transition-all group-hover:bg-primary/20"}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-8xl">trending_up</span>
          </div>
        </motion.div>

        {/* Quick Action Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-4 bg-primary-container text-white rounded-xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden group"
        >
          <div className="relative z-10">
            <span className="material-symbols-outlined text-4xl mb-4">bolt</span>
            <h3 className="text-xl font-bold font-headline leading-tight">Start new collection</h3>
            <p className="text-white/70 text-sm mt-2">Generate a workspace with your current presets.</p>
          </div>
          <Button variant="primary" className="bg-white text-primary hover:bg-white/90" size="full">
            Initialize
          </Button>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        </motion.div>

        {/* Metrics */}
        {METRICS.map((metric, i) => (
          <motion.div 
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className="md:col-span-4 bg-surface-container-low rounded-xl p-6 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${metric.colorClass}`}>
              <span className="material-symbols-outlined">{metric.icon}</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">{metric.label}</p>
              <p className="text-xl font-bold font-headline">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search Assistant Integration */}
      <section>
        <SearchAssistant />
      </section>

      {/* Activity Feed Section */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-extrabold font-headline tracking-tight text-on-surface">Recent Activity</h3>
            <p className="text-on-surface-variant">Update on your shared workspaces</p>
          </div>
          <button className="text-primary font-bold text-sm hover:underline">View all</button>
        </div>
        <div className="space-y-6">
          {ACTIVITIES.map((activity, i) => (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="group flex items-start gap-6 p-4 -mx-4 rounded-xl hover:bg-surface-container-low transition-colors duration-200"
            >
              <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-surface-container-high flex items-center justify-center">
                {activity.imageUrl ? (
                  <img src={activity.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <span className="material-symbols-outlined text-outline text-3xl">{activity.icon}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors">{activity.title}</h4>
                  <span className="text-xs text-on-surface-variant mt-1">{activity.timestamp}</span>
                </div>
                <p className="text-on-surface-variant text-sm mt-1 line-clamp-2">{activity.description}</p>
                <div className="flex gap-2 mt-3">
                  {activity.contributorPhoto && (
                    <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden">
                      <img src={activity.contributorPhoto} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                  {activity.priority && (
                    <span className="px-2 py-0.5 bg-error/10 text-error text-[10px] font-bold rounded uppercase">Priority</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
