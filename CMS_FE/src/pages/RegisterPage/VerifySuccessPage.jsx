import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CheckCircle } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold text-green-600">Account Verified!</h1>
        <p className="mt-4 text-gray-600">
          You have successfully verified your account.
        </p>
        <p className="mt-1 text-gray-500 text-sm">
          Press "OK" to go to the login page.
        </p>
        <button
          onClick={handleRedirect}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default VerifySuccessPage;
