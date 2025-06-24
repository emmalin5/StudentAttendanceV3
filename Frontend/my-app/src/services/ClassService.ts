import axios from 'axios';
import type { UniversityClass } from '../types';

const API_URL = 'http://localhost:3001'; // Adjust the URL if your server is running elsewhere

// Read: Get all classes
export const getClasses = async () => {
  try {
    const response = await axios.get(`${API_URL}/universityClasses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
};

// Create: Add a new class
export const createClass = async (newClass: UniversityClass) => {
  try {
    const response = await axios.post(`${API_URL}/universityClasses`, newClass);
    return response.data;
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};

// Update: Modify an existing class
export const updateClass = async (updatedClass: UniversityClass) => {
  try {
    const response = await axios.put(`${API_URL}/universityClasses/${updatedClass.id}`, updatedClass);
    return response.data;
  } catch (error) {
    console.error('Error updating class:', error);
    throw error;
  }
};

// Delete: Remove a class
export const deleteClass = async (classId: string) => {
  try {
    await axios.delete(`${API_URL}/universityClasses/${classId}`);
  } catch (error) {
    console.error('Error deleting class:', error);
    throw error;
  }
};
