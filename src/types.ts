export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  imageUrl?: string;
  contributorPhoto?: string;
  priority?: boolean;
  icon?: string;
}

export interface Metric {
  label: string;
  value: string;
  icon: string;
  colorClass: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  type: string;
  timestamp: number;
  uid: string;
}
