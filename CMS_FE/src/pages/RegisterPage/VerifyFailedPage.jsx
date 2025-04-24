import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { XCircle } from 'lucide-react';
import './register.css';

function VerifyFailedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error('Account verification failed. The link may have expired or is invalid.', {
      autoClose: 5000,
    });
  }, []);

  const handleRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="verify-failed-container">
      <div className="verify-failed-box">
        <div className="verify-failed-icon">
          <XCircle className="text-red-500 w-16 h-16" />
        </div>
        <h1 className="verify-failed-header">Verification Failed</h1>
        <p className="verify-failed-message">
          We couldn't verify your account. The confirmation link may have expired or is invalid.
        </p>
        <p className="verify-failed-note">Press "Go Back" to try registering again.</p>
        <button onClick={handleRedirect} className="verify-failed-button">
          Go Back to Register
        </button>
      </div>
    </div>
  );
}

export default VerifyFailedPage;
