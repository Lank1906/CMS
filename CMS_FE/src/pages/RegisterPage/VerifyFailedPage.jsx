import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { XCircle } from 'lucide-react';

function VerifyFailedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error('Account verification failed. The link may have expired or is invalid.', {
      autoClose: 5000,
    });
  }, []);

  const handleRedirect = () => {
    navigate('/auth/register');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <XCircle className="text-red-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold text-red-600">Verification Failed</h1>
        <p className="mt-4 text-gray-600">
          We couldn't verify your account. The confirmation link may have expired or is invalid.
        </p>
        <p className="mt-1 text-gray-500 text-sm">
          Please try registering again or contact support for help.
        </p>
        <button
          onClick={handleRedirect}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
        >
          Go Back to Register
        </button>
      </div>
    </div>
  );
}

export default VerifyFailedPage;
