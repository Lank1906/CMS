import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      setIsSubmitting(false);
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at 8 characters long');
      setIsSubmitting(false);
      return;
    }
    if (!/\d/.test(newPassword)) {
      toast.error('Password must be at least 1 digit (0-9).');
      setIsSubmitting(false);
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      toast.error('Password must be at least 1 uppercase letter (A-Z).');
      setIsSubmitting(false);
      return;
    }
    if (/[^a-zA-Z0-9]/.test(newPassword)) {
      toast.error('Password must not contain special characters');
      setIsSubmitting(false);
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/reset-password`, {
        token,
        newPassword,
      });
      toast.success('Password has been reset!');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset failed');
      setIsSubmitting(false);
    }
  };
  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card bg-white p-4">
        <div className="text-center mb-4">
          <img src="/images/logo.webp" alt="Logo" className="logo" />
          <span className="logo-text">BlueOC</span>
        </div>
        <h5 className="text-center mb-4 input-font">Reset Password</h5>
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
            className="btn btn-primary btn-lg w-100 mb-3"
            disabled={isSubmitting}
          >
            <span className={`button-content ${isSubmitting ? 'loading' : ''}`}>
              {isSubmitting && <span className="loadingSpinner"></span>}
              {isSubmitting ? 'Submitting...' : 'Update Password'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
