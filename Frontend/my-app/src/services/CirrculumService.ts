// src/services/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
});

// Programs CRUD
export const fetchPrograms = async () => {
  const res = await apiClient.get('/programs');
  return res.data;
};

export const createProgram = async (data: any) => {
  const res = await apiClient.post('/programs', data);
  return res.data;
};

export const updateProgram = async (id: number, data: any) => {
  const res = await apiClient.put(`/programs/${id}`, data);
  return res.data;
};

export const deleteProgram = async (id: number) => {
  await apiClient.delete(`/programs/${id}`);
};

// Levels CRUD
export const fetchLevels = async () => {
  const res = await apiClient.get('/levels');
  return res.data;
};

export const createLevel = async (data: any) => {
  const res = await apiClient.post('/levels', data);
  return res.data;
};

export const updateLevel = async (id: number, data: any) => {
  const res = await apiClient.put(`/levels/${id}`, data);
  return res.data;
};

export const deleteLevel = async (id: number) => {
  await apiClient.delete(`/levels/${id}`);
};

// Courses CRUD
export const fetchCourses = async () => {
  const res = await apiClient.get('/courses');
  return res.data;
};

export const createCourse = async (data: any) => {
  const res = await apiClient.post('/courses', data);
  return res.data;
};

export const updateCourse = async (id: number, data: any) => {
  const res = await apiClient.put(`/courses/${id}`, data);
  return res.data;
};

export const deleteCourse = async (id: number) => {
  await apiClient.delete(`/courses/${id}`);
};