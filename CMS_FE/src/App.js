import React from 'react';
import AppRouter from './router/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppRouter />
        <ToastContainer position="top-right" autoClose={3000} />
      </ToastProvider>
    </AuthProvider>
  );
}
export default App;
