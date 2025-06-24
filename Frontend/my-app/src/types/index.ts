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


  export interface ContactInfo {
    address: string;
    city: string;
    zipCode: string;
    country: string;
    telephone1: string;
    telephone2: string;
    email: string;
  }
  
  export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    placeOfBirth: string;
    dateOfBirth: string;
    gender: 'Male' | 'Female' | 'Other';
    idCard: string;
    socialSecurityNumber: string;
    status: 'active' | 'inactive';
    contact: ContactInfo;
  }
  

  
  export interface Schedule {
    days: string[]; // Array of days, e.g., ["Tuesday", "Thursday"]
    startTime: string; // e.g., "10:00 AM"
    endTime: string; // e.g., "12:00 PM"
    location: string; // e.g., "Room A101"
}

export interface UniversityClass {
    id: string;
    name: string;
    programId: string;  
    levelId: string;    
    courseId: string;   
    collegePeriodId: string; 
    registeredStudentIds: string[];
    schedule: Schedule;
}

