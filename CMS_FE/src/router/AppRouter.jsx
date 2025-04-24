import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from '../pages/AdminPage';
import LoginForm from '../pages/LoginPage/LoginForm';
import { useAuth } from '../hooks/useAuth';
import ForgotPassword from '../pages/LoginPage/ForgotPassword';
import ResetPassword from '../pages/LoginPage/ResetPassword';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import VerifySuccessPage from '../pages/RegisterPage/VerifySuccessPage';
import VerifyFailedPage from '../pages/RegisterPage/VerifyFailedPage';
const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/admin" element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-success" element={<VerifySuccessPage />} />
      <Route path="/verify-failed" element={<VerifyFailedPage />} />
    </Routes>
  );
};

export default AppRouter;
