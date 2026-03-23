import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className="auth-page card">
      <h1>Login</h1>
      <p>Sign in to create posts and like updates from the community.</p>
      <form className="auth-form" onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
      <p>
        New here? <Link to="/register">Create an account</Link>
      </p>
    </section>
  );
};

export default LoginPage;
