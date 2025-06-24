import axios from 'axios';
import type { Student } from '../types/index';

const apiClient = axios.create({ baseURL: 'http://localhost:3001' });

export const fetchStudents = async (): Promise<Student[]> => {
  const res = await apiClient.get('/students');
  return res.data;
};

export const fetchStudentById = async (id: string): Promise<Student> => {
  const res = await apiClient.get(`/students/${id}`);
  return res.data;
};

export const createStudent = async (data: Omit<Student, 'id'>): Promise<Student> => {
  const res = await apiClient.post('/students', data);
  return res.data;
};

export const updateStudent = async (id: string, data: Student): Promise<Student> => {
  const res = await apiClient.put(`/students/${id}`, data);
  return res.data;
};

export const deleteStudent = async (id: string): Promise<void> => {
  await apiClient.delete(`/students/${id}`);
};
