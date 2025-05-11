import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const LoginCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const full_name = params.get('full_name');
    const user_id = params.get('user_id');
    const role_id = parseInt(params.get('role_id'), 10);

    if (token && user_id && full_name && role_id) {
      const userData = { user_id, full_name, role_id };
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      login(userData, token);
      toast.success('Login with Google successful!');
      navigate('/home');
    } else {
      toast.error('Login failed');
      navigate('/login');
    }
  }, []);

  return <div>Logging in with Google...</div>;
};

export default LoginCallback;
