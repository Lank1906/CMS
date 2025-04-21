import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    <div className="text-center mt-24">
      <h1 className="text-green-500 text-4xl font-semibold">Account has been verified!</h1>
      <p className="mt-4">You have successfully verified your account.</p>
      <p className="mt-2">Press "OK" to go to the login page.</p>
      <button
        onClick={handleRedirect}
        className="mt-6 px-6 py-3 text-lg bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600"
      >
        OK
      </button>
    </div>
  );
}

export default VerifySuccessPage;
