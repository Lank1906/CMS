import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { validateRequiredField, validateEmail } from '../utils/validators';
import axios from 'axios';
import '../assets/styles/LoginForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL } from '../config/config.js';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const notify = (message) => toast.error(message);

    const handleLogin = async () => {
        const requiredEmailError = validateRequiredField(email, 'Email');
        if (requiredEmailError) {
            notify(requiredEmailError);
            return;
        }
        const requiredPasswordError = validateRequiredField(password, 'Password');
        if (requiredPasswordError) {
            notify(requiredPasswordError);
            return;
        }
        const emailError = validateEmail(email);
        if (emailError) {
            notify(emailError);
            return;
        }
        try {
            const response = await axios.post(API_URL + 'login', { email, password });
            const { token, role_id, user_name } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({ role_id, user_name }));
            login({ role_id, user_name }, token);

            if (role_id === 1) navigate('/admin');
            else if (role_id === 2) navigate('/pm');
            else if (role_id === 3) navigate('/staff');
            else navigate('/login');
        } catch (error) {
            notify('Incorrect email or password.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <div className="border p-5 rounded shadow-sm">
                    <h2 className="text-center mb-4">LOGIN</h2>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success w-100" onClick={handleLogin}>
                        LOGIN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
