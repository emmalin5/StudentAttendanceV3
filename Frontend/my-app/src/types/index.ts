// src/types/index.ts
export interface Program {
    id: number;
    name: string;
  }
  
  export interface Level {
    id: number;
    programId: number;
    name: string;
    shortName: string;
  }
  
  export interface Course {
    id: number;
    programId: number;
    levelId: number;
    name: string;
    code: string;
    description?: string;
    teachingHoursPerWeek: number;
    credits: number;
    color: string;
  }

  export interface CollegePeriod {
    id: number;
    name: string;
    shortName: string;
    startDate: string;
    endDate: string;
    restingDays: string[];
  }