import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { 
    validateRequiredField, 
    validateEmail, 
} from '../utils/validators';
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
            const response = await axios.post(API_URL + 'login', {
                email,
                password,
            });
            const { token, role_id, user_name } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({ role_id, user_name }));
            login({ role_id, user_name }, token);
            if (role_id === 1) {
                navigate('/admin');
            } else if (role_id === 2) {
                navigate('/pm');
            } else if (role_id === 3) {
                navigate('/staff');
            } else {
                navigate('/login');
            }
        } catch (error) {
            notify('Incorrect email or password.');
        }
    };
    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-content row">
                    <div className="col-12 text-login">LOGIN</div>
                    <div className="col-12 form-group login-input">
                        <label>Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="col-12 form-group login-input">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <button className="btn-login" onClick={handleLogin}>
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
