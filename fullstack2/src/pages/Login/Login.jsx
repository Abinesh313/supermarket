import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../userSlice'; // Adjust the path if necessary
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './Login.css'; // Ensure you have corresponding styles for the component

function Login({ isSignUp = false }) {
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [signUpError, setSignUpError] = useState('');
  const [signInError, setSignInError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateUsername = (name) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(name);
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!validateUsername(signUpData.name)) {
      setSignUpError('Username must not contain spaces or special characters.');
      toast.error('Username must not contain spaces or special characters.');
      return;
    }
    if (!validatePassword(signUpData.password)) {
      setSignUpError('Password must be at least 8 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character.');
      toast.error('Password must be at least 8 characters long and contain required characters.');
      return;
    }
    if (!validateConfirmPassword(signUpData.password, signUpData.confirmPassword)) {
      setSignUpError('Passwords do not match.');
      toast.error('Passwords do not match.');
      return;
    }
    if (!validateEmail(signUpData.email)) {
      setSignUpError('Invalid email format.');
      toast.error('Invalid email format.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/register',
        {
          name: signUpData.name,
          email: signUpData.email,
          password: signUpData.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Registration Successful:', response.data);
      toast.success('Registration Successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response && error.response.status === 409) {
        // Assuming 409 Conflict status code for email already exists
        setSignUpError('Email already exists.');
        toast.error('Email already exists.');
      } else {
        toast.error('Registration Failed!');
      }
    }

    setSignUpData({ name: '', email: '', password: '', confirmPassword: '' });
    setSignUpError('');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        loginData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Login Successful:', response.data);
      dispatch(login(response.data)); // Dispatch login action with response data
      setSignInError('');
      localStorage.setItem('accessToken', response.data.accessToken); // Store the access token in local storage
      toast.success('Login Successful!');
      if (loginData.email === 'admin@gmail.com') {
        navigate('/addproduct');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      // toast.error('Invalid credentials. Please try again.');
      setSignInError('Invalid credentials. Please try again.');
    }
  };

  const handleChange = (e, setData, setError) => {
    const { name, value } = e.target;
    setData(prevData => {
      const newData = { ...prevData, [name]: value };
      if (isSignUp) {
        if (name === 'password') {
          if (!validatePassword(newData.password)) {
            setError('Password must have 8 characters and at least 1 digit, 1 lowercase, 1 uppercase, 1 special character.');
            // toast.error('Password must have 8 characters and at least 1 digit, 1 lowercase, 1 uppercase, 1 special character.');
          } else {
            setError('');
          }
        } else if (name === 'confirmPassword') {
          if (!validateConfirmPassword(newData.password, newData.confirmPassword)) {
            setError('Passwords do not match.');
            // toast.error('Passwords do not match.');
          } else {
            setError('');
          }
        } else {
          setError('');
        }
      } else {
        setSignInError('');
      }
      return newData;
    });
  };

  return (
    <div className='lbody'>
      <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
        {isSignUp ? (
          <div className="form-container sign-up-container">
            <form onSubmit={handleSignUp}>
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f" style={{ color: '#3b5998' }}></i></a>
                <a href="https://accounts.google.com/servicelogin?hl=en-gb" className="social"><i className="fab fa-google" style={{ color: '#db4437' }}></i></a>
                <a href="https://www.linkedin.com/login" className="social"><i className="fab fa-linkedin-in" style={{ color: '#0077b5' }}></i></a>
              </div>
              <span>or use your email for registration</span>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={signUpData.name}
                onChange={(e) => handleChange(e, setSignUpData, setSignUpError)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={signUpData.email}
                onChange={(e) => handleChange(e, setSignUpData, setSignUpError)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={signUpData.password}
                onChange={(e) => handleChange(e, setSignUpData, setSignUpError)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={signUpData.confirmPassword}
                onChange={(e) => handleChange(e, setSignUpData, setSignUpError)}
                required
              />
              <button type="submit">Sign Up</button>
              {signUpError && <p className="error">{signUpError}</p>}
            </form>
          </div>
        ) : (
          <div className="form-container sign-in-container">
            <form onSubmit={handleSignIn}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f" style={{ color: '#3b5998' }}></i></a>
                <a href="https://accounts.google.com/servicelogin?hl=en-gb" className="social"><i className="fab fa-google" style={{ color: '#db4437' }}></i></a>
                <a href="https://www.linkedin.com/login" className="social"><i className="fab fa-linkedin-in" style={{ color: '#0077b5' }}></i></a>
              </div>
              <span>or use your account</span>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={loginData.email}
                onChange={(e) => handleChange(e, setLoginData, setSignInError)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={(e) => handleChange(e, setLoginData, setSignInError)}
                required
              />
              <button type="submit">Sign In</button>
              {signInError && <p className="error">{signInError}</p>}
            </form>
          </div>
        )}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={() => navigate('/login')}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={() => navigate('/signup')}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
