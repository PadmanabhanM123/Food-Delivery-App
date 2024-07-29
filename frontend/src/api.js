import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async ({email, password,username,dob}) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, { email, password,username,dob });
    console.log("Register:",response.data);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
