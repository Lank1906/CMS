import axios from 'axios';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
const login = async (email, password) => {
  try {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + 'login', {
      email,
      password,
    });
    if (response.data.token) {
      const decoded = jwtDecode(response.data.token);
      const role_id = decoded.role_id;
      const full_name = decoded.full_name;
      const user = {
        token: response.data.token,
        role_id: role_id,
        full_name: full_name,
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
