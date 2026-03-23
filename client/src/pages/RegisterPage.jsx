import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <section className="auth-page card">
      <h1>Create account</h1>
      <p>Start your MERN social media app journey with a working auth flow.</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="name" onChange={handleChange} placeholder="Full name" type="text" value={formData.name} />
        <input name="email" onChange={handleChange} placeholder="Email" type="email" value={formData.email} />
        <input
          name="password"
          onChange={handleChange}
          placeholder="Password"
          type="password"
          value={formData.password}
        />
        {error ? <p className="error-text">{error}</p> : null}
        <button className="button" type="submit">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
};

export default RegisterPage;
