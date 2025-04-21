import React, { useState } from 'react';
import styles from './RegisterPage.module.css';
import { registerUser } from '../../services/api';
import logo from '../../assets/logo.jpg';

import { toast } from 'react-toastify';

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
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 409) {
          toast.warning(error.response.data.message);
        } else {
          toast.error('An error occurred, please try again later!');
        }
      } else {
        toast.error('An error occurred, please try again later!');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.registerTitle}>
        <div className={styles.brand}>
          <img src={logo} alt="BluOC Logo" className={styles.logo} />
          <span className={styles.brandName}>BluOC</span>
        </div>
        <h2 className={styles.pageTitle}>Register</h2>
      </div>
      <div className={styles.floatingGroup}>
        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required className={styles.floatingInput} placeholder=" " />
        <label htmlFor="fullName" className={styles.floatingLabel}>FullName</label>
      </div>

      <div className={styles.floatingGroup}>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className={styles.floatingInput} placeholder=" " />
        <label htmlFor="password" className={styles.floatingLabel}>Password</label>
      </div>

      <div className={styles.floatingGroup}>
        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className={styles.floatingInput} placeholder=" " />
        <label htmlFor="confirmPassword" className={styles.floatingLabel}>Confirm Password</label>
      </div>

      <div className={styles.floatingGroup}>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={styles.floatingInput} placeholder=" " />
        <label htmlFor="email" className={styles.floatingLabel}>Email</label>
      </div>

      <div className={styles.floatingGroup}>
        <input type="number" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className={styles.floatingInput} placeholder=" " />
        <label htmlFor="phone" className={styles.floatingLabel}>Phone</label>
      </div>

      <div className={styles.floatingGroup}>
        <select id="role" name="role" value={formData.role} onChange={handleChange} required className={styles.floatingInput}>
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>
        <label htmlFor="role" className={styles.floatingLabel}>Role</label>
      </div>

      <div className={styles.floatingGroup}>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required className={styles.floatingInput} placeholder="" />
        <label htmlFor="address" className={styles.floatingLabel}>Address</label>
      </div>

      <button type="submit" className={styles.button} disabled={isSubmitting}>
        {isSubmitting ? (<span className={styles.loadingSpinner}></span>) : ('Register')}
      </button>

    </form>
  );
};

export default RegisterForm;
