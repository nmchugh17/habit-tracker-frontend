import axios from 'axios';

const API_BASE_URL = 'https://ume059yd2j.execute-api.eu-west-1.amazonaws.com';

export const getHabits = async () => {
  const response = await axios.get(`${API_BASE_URL}/habits`);
  return response.data;
};

export const logHabit = async (habitData: any) => {
  const response = await axios.post(`${API_BASE_URL}/habit`, habitData);
  return response.data;
};