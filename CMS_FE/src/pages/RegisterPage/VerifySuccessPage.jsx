import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CheckCircle } from 'lucide-react';
import './register.css';

function VerifySuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success('Account verified successfully!', {
      autoClose: 3000,
    });
  }, []);

  const handleRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="verify-success-container">
      <div className="verify-success-box">
        <div className="verify-success-icon">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>
        <h1 className="verify-success-header">Account Verified!</h1>
        <p className="verify-success-message">You have successfully verified your account.</p>
        <p className="verify-success-note">Press "OK" to go to the login page.</p>
        <button onClick={handleRedirect} className="verify-success-button">
          OK
        </button>
      </div>
    </div>
  );
}

export default VerifySuccessPage;
