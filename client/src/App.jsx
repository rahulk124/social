import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import FeedPage from './pages/FeedPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  const { loading, user } = useAuth();

  if (loading) {
    return <p className="page-status">Checking session...</p>;
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route element={<FeedPage />} path="/" />
          <Route element={user ? <Navigate replace to="/" /> : <LoginPage />} path="/login" />
          <Route element={user ? <Navigate replace to="/" /> : <RegisterPage />} path="/register" />
        </Routes>
      </main>
    </div>
  );
};

export default App;
