import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateRequiredField, validateEmail } from '../utils/validators.js';
import axios from 'axios';
import '../assets/styles/LoginForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL } from '../config/config.js';
import { jwtDecode } from 'jwt-decode';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const notify = (message) => toast.error(message);
  const toggleShow = () => setShowPassword((prev) => !prev);

  const handleLogin = async () => {
    const requiredEmailError = validateRequiredField(email, 'Email');
    if (requiredEmailError) {
      notify(requiredEmailError);
      return;
    }
    const emailError = validateEmail(email);
    if (emailError) {
      notify(emailError);
      return;
    }

    const requiredPasswordError = validateRequiredField(password, 'Password');
    if (requiredPasswordError) {
      notify(requiredPasswordError);
      return;
    }

    try {
      const response = await axios.post(API_URL + 'login', { email, password });
      const { token } = response.data;
      const decoded = jwtDecode(token);
      const { role_id, user_name, user_id } = decoded;
      const userData = { user_id, role_id, full_name: user_name };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      login(userData, token);

      if (role_id === 1) navigate('/admin');
      else if (role_id === 2) navigate('/pm');
      else if (role_id === 3) navigate('/staff');
      else navigate('/');
    } catch {
      notify('Incorrect email or password.');
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card bg-white p-4">
        <div className="text-center mb-4">
          <img src="/images/logo.webp" alt="Logo" className="logo" />
          <span className="logo-text">BlueOC</span>
        </div>

        <h5 className="text-center mb-4 input-font">Welcome back</h5>

        <div className="floating-label-input mb-4">
          <input
            type="text"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="floating-label-input mb-4 position-relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <span className="password-toggle" onClick={toggleShow}></span>
        </div>

        <div className="d-flex justify-content-between links mb-4">
          <a href="/forgot-password">Forgot password</a>
        </div>

        <button className="btn btn-primary btn-lg w-100 mb-3" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
