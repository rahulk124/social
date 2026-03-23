import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <Link className="navbar__brand" to="/">
        Social MERN
      </Link>

      <nav className="navbar__actions">
        {user ? (
          <>
            <span className="navbar__user">Hi, {user.name}</span>
            <button className="button button--ghost" onClick={logout} type="button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="button button--ghost" to="/login">
              Login
            </Link>
            <Link className="button" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
