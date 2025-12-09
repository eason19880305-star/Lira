export type TemplateId = 'modern' | 'classic' | 'technical' | 'minimal' | 'left-column' | 'high-end';

export interface Education {
  id: string;
  school: string;
  degree: string;
  college: string; // e.g., Computer Science College
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string; // e.g., National Scholarship
  courses?: string; // Core courses
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  summary?: string; // Brief 1-2 line intro
  details: string[]; // Bullet points
}

export interface Project {
  id: string;
  name: string;
  role?: string;
  link?: string; // GitHub or Demo link
  startDate: string;
  endDate: string;
  summary: string;
  techStack: string; // Comma separated or special format
  details: string[]; // Bullet points
}

export interface ResumeData {
  personalInfo: {
    name: string;
    jobIntention: string; // Target Role
    phone: string;
    email: string;
    location: string;
    photoUrl?: string; // Base64 or URL
    github?: string;
    blog?: string;
  };
  sectionOrder: string[]; // ['education', 'skills', 'internships', 'projects']
  education: Education[];
  internships: Internship[];
  projects: Project[];
  skills: {
    category: string; // e.g., "Java Basics", "Frameworks"
    items: string[];
  }[];
}

export interface StarGuideData {
  situation: string;
  task: string;
  action: string;
  result: string;
}