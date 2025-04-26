import React, { useState } from 'react';
import './register.css';
import { registerUser } from '../../services/api';
import logo from '../../assets/logo.jpg';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { validateRegisterFrontend } from '../../utils/validators';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    role: 'Employee',
    address: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    if (formErrors[name]) setFormErrors((f) => ({ ...f, [name]: false }));
  };

  const handlePhoneChange = (value) => {
    setFormData((f) => ({ ...f, phone: value }));
    if (formErrors.phone) setFormErrors((f) => ({ ...f, phone: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setFormErrors({ password: true, confirmPassword: true });
      toast.error('Password and confirm password do not match!');
      return;
    }

    const frontendError = validateRegisterFrontend(formData);
    if (frontendError) {
      toast.error(frontendError);

      const errs = {};
      if (frontendError.toLowerCase().includes('full name')) errs.fullName = true;
      if (frontendError.toLowerCase().includes('password')) errs.password = true;
      if (frontendError.toLowerCase().includes('email')) errs.email = true;
      if (frontendError.toLowerCase().includes('phone')) errs.phone = true;
      if (frontendError.toLowerCase().includes('address')) errs.address = true;
      setFormErrors(errs);

      return;
    }
    setIsSubmitting(true);
    setFormErrors({});

    try {
      const res = await registerUser(formData);
      setFormData({
        fullName: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        role: 'Employee',
        address: '',
      });
      toast.success(res.message, {
        autoClose: 500,
        onClose: () => navigate('/register-success'),
      });
    } catch (error) {
      const msg = error.response?.data?.message || 'Server error';
      toast.error(msg);

      const errs = {};
      if (msg.includes('fill in all')) {
        ['fullName', 'password', 'confirmPassword', 'email', 'phone', 'address'].forEach(
          (f) => (errs[f] = true)
        );
      } else {
        if (msg.toLowerCase().includes('full name')) errs.fullName = true;
        if (msg.toLowerCase().includes('password')) errs.password = true;
        if (msg.toLowerCase().includes('email')) errs.email = true;
        if (msg.toLowerCase().includes('phone')) errs.phone = true;
        if (msg.toLowerCase().includes('address')) errs.address = true;
      }
      setFormErrors(errs);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <ToastContainer position="top-right" newestOnTop closeOnClick pauseOnHover />
        <div className="registerTitle">
          <div className="brand">
            <img src={logo} alt="BluOC Logo" className="logo" />
            <span className="brandName">BlueOC</span>
          </div>
          <h2 className="pageTitle">REGISTER</h2>
        </div>
        <div className={`floatingGroup ${formErrors.fullName ? 'error' : ''}`}>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="floatingInput"
            placeholder=" "
          />
          <label className="floatingLabel">Full Name</label>
        </div>

        <div className={`floatingGroup ${formErrors.password ? 'error' : ''}`}>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="floatingInput"
            placeholder=" "
          />
          <label className="floatingLabel">Password</label>
        </div>
        <div className={`floatingGroup ${formErrors.confirmPassword ? 'error' : ''}`}>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="floatingInput"
            placeholder=" "
          />
          <label className="floatingLabel">Confirm Password</label>
        </div>
        <div className={`floatingGroup ${formErrors.email ? 'error' : ''}`}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="floatingInput"
            placeholder=" "
          />
          <label className="floatingLabel">Email</label>
        </div>
        <div className={`floatingGroup ${formErrors.phone ? 'error' : ''}`}>
          <PhoneInput
            inputStyle={{ width: '100%', height: '47px' }}
            country="vn"
            value={formData.phone}
            onChange={handlePhoneChange}
            inputProps={{ name: 'phone', required: true }}
            inputClass="floatingInput"
            buttonClass="phone-dropdown"
          />
        </div>
        <div className={`floatingGroup ${formErrors.address ? 'error' : ''}`}>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="floatingInput"
            placeholder=" "
          />
          <label className="floatingLabel">Address</label>
        </div>

        <button type="submit" className="button" disabled={isSubmitting}>
          <span className={`button-content ${isSubmitting ? 'loading' : ''}`}>
            {isSubmitting && <span className="loadingSpinner"></span>}
            {isSubmitting ? 'Submitting...' : 'Register'}
          </span>
        </button>

        <p className="center-text">
          Already have an account?{' '}
          <Link to="/login">
            <span>Sign in</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
