import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import VerifySuccessPage from '../pages/RegisterPage/VerifySuccessPage';
import VerifyFailedPage from '../pages/RegisterPage/VerifyFailedPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/verify-success" element={<VerifySuccessPage />} />
      <Route path="/auth/verify-failed" element={<VerifyFailedPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
