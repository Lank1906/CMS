import { Files, CircleCheckBig } from 'lucide-react';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InputCopy = ({ value = '', showButton = true }) => {
  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      toast.success('Copied to clipboard!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          color: '#000000',
        },
        icon: <CircleCheckBig size={32} color="#2d3052" strokeWidth={3} />,
        progressClassName: 'custom-progress-bar',
      });
    } else {
      toast.error('No data to copy!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          color: '#000000',
        },
        icon: <CircleCheckBig size={32} color="#2d3052" strokeWidth={3} />,
        progressClassName: 'custom-progress-bar',
      });
    }
  };

  return (
    <div className=" h-[40px] bg-gray-200 flex items-center justify-between border border-gray-300 rounded-md overflow-hidden">
      <input
        type="text"
        value={value || 'No Data'}
        readOnly
        className={` w-[100%] bg-red-500 p-2 outline-none bg-transparent ${showButton ? 'w-[calc(80%)]' : 'w-full'}`}
        aria-label="Input Field for Copying"
      />

      {showButton && (
        <button
          onClick={handleCopy}
          className="w-[40px] p-2 hover:bg-gray-300 rounded-md transition-all"
          aria-label="Copy to Clipboard"
        >
          <Files />
        </button>
      )}
    </div>
  );
};

export default InputCopy;
