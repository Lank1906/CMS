import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import './register.css';

function RegisterSuccessPage() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="verify-success-container">
      <div className="verify-success-box">
        <div className="verify-success-icon">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>
        <h1 className="verify-success-header">Registration Successful!</h1>
        <p className="verify-success-message">
          Thank you for registering. Please check your email to verify your account and complete
          your registration.
        </p>
        <p className="verify-success-note">Click "OK" to return to the login page.</p>
        <button onClick={handleRedirect} className="verify-success-button">
          OK
        </button>
      </div>
    </div>
  );
}

export default RegisterSuccessPage;
