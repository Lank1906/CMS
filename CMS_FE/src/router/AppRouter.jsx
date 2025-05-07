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
import Contracts from '../pages/Contract/Contract';
import Home from '../pages/Home/Home';
import MainLayout from '../pages/layout/MainLayout';
import AccountDetails from '../pages/Account/AccountDetails';
import ContractDetails from '../pages/Contract/ContractDetails';
import RegisterSuccessPage from '../pages/RegisterPage/RegisterSuccessPage';
import { AccountProvider } from '../context/AccountContext';
import { ContractProvider } from '../context/ContractContext';
import ForgotPasswordPage from '../pages/LoginPage/ForgotPasswordSuccessPage';
import { ProjectProvider } from '../context/ProjectContext';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/home" element={<MainLayout />}>
        <Route path="/home" index element={<Home />} />
        <Route
          path="/home/accounts"
          element={
            <AccountProvider>
              <Accounts />
            </AccountProvider>
          }
        />
        <Route
          path="/home/projects/:id"
          element={
            <ContractProvider>
              <Contracts />
            </ContractProvider>
          }
        />
        <Route path="/home/contracts/:id" element={<ContractDetails />} />
        <Route
          path="/home/accounts/:id"
          element={
            <ProjectProvider>
              <AccountDetails />
            </ProjectProvider>
          }
        />
        <Route
          path="/home/projects"
          element={
            <ProjectProvider>
              <Projects />
            </ProjectProvider>
          }
        />
      </Route>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-success" element={<VerifySuccessPage />} />
      <Route path="/verify-failed" element={<VerifyFailedPage />} />
      <Route path="/register-success" element={<RegisterSuccessPage />} />
      <Route path="/send-mail-forgot-password-success" element={<ForgotPasswordPage />} />
    </Routes>
  );
};

export default AppRouter;
