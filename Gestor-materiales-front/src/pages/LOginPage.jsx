import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ correo: '', password: '' });
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser(credentials);
      login(userData);
      history.push('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            className="form-control"
            id="correo"
            name="correo"
            value={credentials.correo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
