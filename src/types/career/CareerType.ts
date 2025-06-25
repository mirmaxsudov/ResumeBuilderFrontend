
interface ImageFile {
    id: number;
    url: string;
    downloadUrl: string;
    extension: string;
    type: "IMAGE";
    width: number;
    height: number;
  }
  
  interface Resume {
    id: number;
    title: string;
  }
  
  interface Summary {
    id: number;
    title: string;
    summary: string;
  }
  
  interface LanguageItem {
    id: number;
    name: string;
    priority: number;
    level: "NATIVE_SPEAKER" | "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | string; // qo'shimcha darajalarni xohlasa qo'shishingiz mumkin
  }
  
  interface Language {
    id: number;
    title: string;
    items: LanguageItem[];
  }
  
  interface ExperienceItem {
    id: number;
    jobTitle: string;
    startDate: string;
    endDate: string;
    priority: number;
    description: string;
    currentJob: boolean;
  }
  
  interface Experience {
    id: number;
    title: string;
    items: ExperienceItem[];
  }
  
  interface EducationItem {
    id: number;
    title: string;
    degree: string;
    startDate: string;
    endDate: string;
    city: string;
    description: string;
    priority: number;
    currentStudy: boolean;
  }
  
  interface Education {
    id: number;
    title: string;
    items: EducationItem[];
  }
  
  export interface CareerProfile {
    linearGradientBG: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    address: string;
    website: string;
    websiteLink: string;
    skills: string[];
    thumbnailImage: ImageFile;
    profileImage: ImageFile;
    resumes: Resume[];
    summary: Summary;
    language: Language;
    experience: Experience;
    education: Education;
  }
  