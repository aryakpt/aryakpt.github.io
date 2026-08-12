export interface Project {
  tag: string;
  title: string;
  image: string | null;
  description: string;
  techs: string[];
  status: 'Professional' | 'Personal' | 'Academic' | 'In Progress' | string;
  website?: string;
  github?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Artificial Intelligence' | 'Engineering' | 'Tutorial' | string;
  created_at?: string;
  updated_at?: string;
  date?: string;
  externalUrl?: string;
  content?: string;
}
