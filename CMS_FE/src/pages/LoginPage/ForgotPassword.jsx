import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/forgot-password`, { email });
      toast.success('Check your email for the reset link!');
      setIsSubmitting(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending reset email');
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
        <h5 className="text-center mb-4 input-font">Forgot Password</h5>
        <form onSubmit={handleSubmit}>
          <div className="floating-label-input mb-4">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingEmail">Email</label>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 mb-3"
            disabled={isSubmitting}
          >
            <span className={`button-content ${isSubmitting ? 'loading' : ''}`}>
              {isSubmitting && <span className="loadingSpinner"></span>}
              {isSubmitting ? 'Submitting...' : 'Send Password Reset Link'}
            </span>
          </button>
        </form>
        <div className="d-flex justify-content-center">
          <Link to="/login" className="register-link">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
