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
  
  