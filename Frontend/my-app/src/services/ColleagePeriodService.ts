import axios from 'axios';

const apiClient = axios.create({ baseURL: 'http://localhost:3001' });

interface CollegePeriodData {
  name: string;
  shortName: string;
  startDate: string;
  endDate: string;
  restingDays: string[];
}

export const fetchCollegePeriods = async () => {
  const res = await apiClient.get('/collegePeriods');
  return res.data;
};

export const createCollegePeriod = async (data: CollegePeriodData) => {
  const res = await apiClient.post('/collegePeriods', data);
  return res.data;
};

export const updateCollegePeriod = async (id: number, data: CollegePeriodData) => {
  const res = await apiClient.put(`/collegePeriods/${id}`, data);
  return res.data;
};

export const deleteCollegePeriod = async (id: number) => {
  const res = await apiClient.delete(`/collegePeriods/${id}`);
  return res.data;
};