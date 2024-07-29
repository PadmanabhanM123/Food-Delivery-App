import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';


const Register = ({ setIsRegistering }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setdob] = useState('');
  const navigate=useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await register({ email, password, username, dob});
      alert("Registration Successful !!!")
      console.log('Registration successful:', data);
      navigate('/dashboard')
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.')
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="Date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setdob(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <div className="toggle-auth">
        <p>
          Already have an account?{' '}
          <button type="button" onClick={() => setIsRegistering(false)}>Login here</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
