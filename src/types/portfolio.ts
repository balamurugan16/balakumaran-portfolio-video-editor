export interface ReelItem {
  id: string;
  title: string;
  client: string;
  category: 'weddings' | 'couples' | 'talking-head' | 'street' | 'featured';
  categoryLabel: string;
  views: string; // e.g. "2.4M", "620K", "3.2 Lakhs"
  rawViews: number; // for sorting by views
  uploadDate?: string;
  viralStatus?: 'viral' | 'not-viral' | 'unknown';
  isHighReach?: boolean; // Highlight badge for viral videos
  likes?: string;
  comments?: string;
  shares?: string;
  saves?: string;
  description: string;
  hookSummary?: string;
  toolsUsed: string; // e.g. "Premiere Pro & DaVinci Resolve"
  coverImage: string;
  instagramUrl?: string;
  videoUrl?: string; // e.g. "/videos/reel1.mp4" for local video
}

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  instagramHandle: string;
  instagramUrl: string;
  tagline: string;
  bio: string;
  softwareSkills: {
    name: string;
    experience: string;
    description: string;
    icon: string;
  }[];
  experience: {
    id: string;
    role: string;
    organization: string;
    period: string;
    summary: string;
    deliverables: string[];
  }[];
  education?: EducationItem[];
}

export interface EducationItem {
  id: string;
  institution: string;
  program: string;
  cohort: string;
  period: string;
  summary: string;
  skillsLearned: {
    title: string;
    description: string;
  }[];
  keyTakeaways: string[];
}
