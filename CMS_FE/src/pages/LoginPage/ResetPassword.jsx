import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at 8 characters long');
      return;
    }
    if (!/\d/.test(newPassword)) {
      toast.error('Password must be at least 1 digit (0-9).');
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      toast.error('Password must be at least 1 uppercase letter (A-Z).');
      return;
    }
    const sqlInjectionPattern = /(')|(--)|(;)|(\*)|(\*)/;
    const match = newPassword.match(sqlInjectionPattern);
    if (match) {
      const bad = match[0];
      toast.error(`Password contains forbidden sequence "${bad}".`);
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/reset-password`, {
        token,
        newPassword,
      });
      setIsLoading(true);
      toast.success('Password has been reset!');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset failed');
    }
  };
  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card bg-white p-4">
        <div className="text-center mb-2">
          <img src="/images/logo.webp" alt="Logo" className="logo" />
          <span className="logo-text">BlueOC</span>
        </div>
        <h5 className="text-center mb-4 input-font">RESET PASSWORD</h5>
        <form onSubmit={handleSubmit}>
          <div className="floating-label-input mb-4">
            <input
              type="password"
              id="newPassword"
              placeholder=" "
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label htmlFor="newPassword">New Password</label>
          </div>
          <div className="floating-label-input mb-4">
            <input
              type="password"
              id="confirmPassword"
              placeholder=" "
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
          <button
            type="submit"
            className="btn-primary-login btn-lg w-100 mb-3"
            disabled={isLoading}
          >
            <span className={`button-content ${isLoading ? 'loading' : ''}`}>
              {isLoading && <span className="loadingSpinner"></span>}
              {isLoading ? 'Sending...' : 'Send Password Reset Link'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
