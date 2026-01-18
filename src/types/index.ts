export interface IProject {
  _id?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface IService {
  _id?: string;
  title: string;
  description: string;
  icon: string;
}

export interface ITech {
  _id?: string;
  title: string;
  description: string;
  skills: string[];
  icon: string;
  color?: string;
}

export interface IHero {
  _id?: string;
  name: string;
  role: string;
  availability: string;
  avatar: string;
  resumeUrl?: string;
  skills?: string;
  description?: string;
}

export interface IAbout {
  _id?: string;
  title: string;
  description: string[];
  image: string;
}

export interface IExperience {
  _id?: string;
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  image: string;
}

