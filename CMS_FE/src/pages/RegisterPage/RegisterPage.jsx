import React, { useState } from 'react';
import './register.css';
import { registerUser } from '../../services/api';
import logo from '../../assets/logo.jpg';
import handleError from '../../utils/handleError';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    role: 'Employee',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Password and confirm password do not match!');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await registerUser(formData);
      setFormData({
        fullName: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        role: 'Employee',
        address: '',
      });

      if (response?.message) {
        toast.success(response.message);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="registerTitle">
          <div className="brand">
            <img src={logo} alt="BluOC Logo" className="logo" />
            <span className="brandName">BlueOC</span>
          </div>
          <h2 className="pageTitle">Register</h2>
        </div>

        <div className="floatingGroup">
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="floatingInput"
            placeholder=" "
          />
          <label htmlFor="fullName" className="floatingLabel">
            Full Name
          </label>
        </div>

        <div className="floatingGroup input-wrapper">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="floatingInput"
            placeholder=" "
          />
          <label htmlFor="password" className="floatingLabel">
            Password
          </label>
          {}
        </div>

        <div className="floatingGroup input-wrapper">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="floatingInput"
            placeholder=" "
          />
          <label htmlFor="confirmPassword" className="floatingLabel">
            Confirm Password
          </label>
          {}
        </div>

        <div className="floatingGroup">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="floatingInput"
            placeholder=" "
          />
          <label htmlFor="email" className="floatingLabel">
            Email
          </label>
        </div>
        <div className="floatingGroup">
          <PhoneInput
            inputClass="floatingInput"
            inputStyle={{ width: '100%', height: '45px' }}
            country={'vn'}
            value={formData.phone}
            onChange={phoneChange}
            required
          />
        </div>

        <div className="floatingGroup">
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="floatingInput"
            placeholder=" "
          />
          <label htmlFor="address" className="floatingLabel">
            Address
          </label>
        </div>

        <button type="submit" className="button" disabled={isSubmitting}>
          <span className={`button-content ${isSubmitting ? 'loading' : ''}`}>
            {isSubmitting && <span className="loadingSpinner"></span>}
            {isSubmitting ? 'Submitting...' : 'Register'}
          </span>
        </button>
        <p class="center-text">
          Already have an account?{' '}
          <Link to="/login">
            <span>Sign in</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
