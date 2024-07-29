import React, { useState } from 'react';
import { login } from '../api'; 
import {useNavigate} from 'react-router-dom'

const Login = ({ setIsRegistering }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await login(email, password);
      console.log('Login successful:', data);
      alert('Login Successful !!!')
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid Login Credentials. Please try again.')
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br></br>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br></br>
        <button type="submit">Login</button>
      </form>
      <div className="toggle-auth">
        <p>
          <b>New user?{' '}</b>
          <button type="button" onClick={() => setIsRegistering(true)}>Register now</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
