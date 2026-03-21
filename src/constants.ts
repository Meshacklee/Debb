import { ActivityItem, Metric } from './types';

export const ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    title: 'Visual Identity: Project Ethereal',
    description: 'Sarah modified the color palette in the shared assets folder. Check out the new tertiary accents.',
    timestamp: '2h ago',
    imageUrl: 'https://picsum.photos/seed/ethereal/200/200',
    contributorPhoto: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    id: '2',
    title: 'Draft Review: Mobile Flow',
    description: 'The checkout flow needs architectural refinement. 3 new comments pending your feedback.',
    timestamp: '5h ago',
    priority: true,
    icon: 'draw',
  },
  {
    id: '3',
    title: 'System Update: 2.4.0',
    description: 'New typography tokens for Manrope and Plus Jakarta Sans have been deployed to the global CDN.',
    timestamp: 'Yesterday',
    imageUrl: 'https://picsum.photos/seed/system/200/200',
  },
];

export const METRICS: Metric[] = [
  {
    label: 'Active Hours',
    value: '32.5h',
    icon: 'timer',
    colorClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
  },
  {
    label: 'Archived',
    value: '128 Assets',
    icon: 'folder_special',
    colorClass: 'bg-secondary-container text-on-secondary-container',
  },
  {
    label: 'Connections',
    value: '14 Active',
    icon: 'hub',
    colorClass: 'bg-primary/5 text-primary',
  },
];
