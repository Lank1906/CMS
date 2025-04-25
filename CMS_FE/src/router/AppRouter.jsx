import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '../pages/LoginPage/LoginForm';
import ForgotPassword from '../pages/LoginPage/ForgotPassword';
import ResetPassword from '../pages/LoginPage/ResetPassword';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import VerifySuccessPage from '../pages/RegisterPage/VerifySuccessPage';
import VerifyFailedPage from '../pages/RegisterPage/VerifyFailedPage';
import Accounts from '../pages/Account/Account';
import Projects from '../pages/Projects/Projects';
import Home from '../pages/Home/Home';
import MainLayout from '../pages/layout/MainLayout';
import AccountDetails from '../pages/Account/AccountDetails';
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/cms" element={<MainLayout />}>
        <Route path="/cms/" index element={<Home />} />
        <Route path="/cms/accounts" element={<Accounts />} />
        <Route path="/cms/accounts/:id" element={<AccountDetails />} />
        <Route path="/cms/projects" element={<Projects />} />
      </Route>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-success" element={<VerifySuccessPage />} />
      <Route path="/verify-failed" element={<VerifyFailedPage />} />
    </Routes>
  );
};

export default AppRouter;
