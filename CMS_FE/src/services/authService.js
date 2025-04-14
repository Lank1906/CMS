import axios from 'axios';
import { API_URL } from "../config/config.js";
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode'; 
const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + 'login', { email, password });

    if (response.data.accessToken) {
      const decoded = jwtDecode(response.data.accessToken);
      const role_id = decoded.role_id; 
      const user_name = decoded.user_name;  
      const user = {
        token: response.data.accessToken,
        role_id: role_id,
        user_name: user_name
      };

      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Login successful!');
      return user;
    }

    throw new Error('No token received');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed!');
    throw error.response?.data || { message: 'Login failed' };
  }
};

const logout = () => {
  localStorage.removeItem('user');
  toast.info('Logged out successfully.');
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export default {
  login,
  logout,
  getCurrentUser,
  jwtDecode,
};
