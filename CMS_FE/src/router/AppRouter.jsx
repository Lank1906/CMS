import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from '../pages/AdminPage';
import PMPage from '../pages/PMPage';
import StaffPage from '../pages/StaffPage';
import LoginForm from '../pages/LoginForm';
import { useAuth } from '../hooks/useAuth';
const AppRouter = () => {
    const { isAuthenticated } = useAuth(); 
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
                path="/admin"
                element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />}
            />
            <Route
                path="/pm"
                element={isAuthenticated ? <PMPage /> : <Navigate to="/login" />}
            />
            <Route
                path="/staff"
                element={isAuthenticated ? <StaffPage /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRouter;
