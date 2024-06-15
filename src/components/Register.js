import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      showPassword: false,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email('Invalid email address')
        .required('Username is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
          username: values.username,
          password: values.password,
        });
        toast.success('Registration successful');
        navigate('/login');
      } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message);
        toast.error('Failed to register');
      }
    },
  });

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit} className="auth-form">
        <input
          type="text"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          placeholder="Username (Email)"
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="error">{formik.errors.username}</div>
        ) : null}
        <input
          type={formik.values.showPassword ? 'text' : 'password'}
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Password"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
        <div className="show-password-container">
          <input
            type="checkbox"
            id="showPassword"
            name="showPassword"
            onChange={formik.handleChange}
            checked={formik.values.showPassword}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>
        <button type="submit" className="auth-button">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Register;
