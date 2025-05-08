import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateRequiredField, validateEmail } from '../../utils/validators.js';
import axios from 'axios';
import './LoginForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const notify = (message) => toast.error(message);
  const toggleShow = () => setShowPassword((prev) => !prev);
  const handleLogin = async () => {
    setIsSubmitting(true);
    const requiredEmailError = validateRequiredField(email, 'Email');
    if (requiredEmailError) {
      notify(requiredEmailError);
      setIsSubmitting(false);
      return;
    }
    const emailError = validateEmail(email);
    if (emailError) {
      notify(emailError);
      setIsSubmitting(false);
      return;
    }
    const requiredPasswordError = validateRequiredField(password, 'Password');
    if (requiredPasswordError) {
      notify(requiredPasswordError);
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/login', {
        email,
        password,
      });
      const { token } = response.data;
      const decoded = jwtDecode(token);
      const { role_id, full_name, user_id } = decoded;
      const userData = { user_id, role_id, full_name: full_name };
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      login(userData, token);
      if (role_id === 1) navigate('/home');
      else if (role_id === 2) navigate('/home');
      else if (role_id === 3) navigate('/home');
      else navigate('/');
    } catch {
      notify('Incorrect Email or Password.');
      setIsSubmitting(false);
    }
  };
  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card bg-white p-4">
        <div className="text-center mb-2">
          <img src="/images/logo.webp" alt="Logo" className="logo" />
          <span className="logo-text">BlueOC</span>
        </div>
        <h5 className="text-center mb-4 input-font">LOGIN</h5>
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
        <button
          onClick={handleLogin}
          className="btn-primary-login btn-lg w-100 mb-3"
          disabled={isSubmitting}
        >
          <span className={`button-content ${isSubmitting ? 'loading' : ''}`}>
            {isSubmitting && <span className="loadingSpinner"></span>}
            {isSubmitting ? 'Submitting...' : 'Login'}
          </span>
        </button>
        <div className="d-flex justify-content-center mb-3">
          <Link to="/forgot-password" className="text-nowrap ">
            Forgot password?
          </Link>
        </div>
        <div className="text-center">
          <span className="text-nowrap">
            Don’t have an account?{' '}
            <Link to="/register" className="register-link">
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
