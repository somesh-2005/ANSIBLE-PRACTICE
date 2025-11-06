import React, { useState, useEffect } from 'react';
import './App.css'; 


const API_BASE_URL = import.meta.env.VITE_API_URL;

// --- Icon Component ---
const Icon = ({ path, size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
  >
    {path}
  </svg>
);

const ICONS = {
  user: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  login: (
    <>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </>
  ),
  userPlus: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" x2="20" y1="8" y2="14" />
      <line x1="23" x2="17" y1="11" y2="11" />
    </>
  ),
  trash: (
    <>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </>
  ),
  alert: (
    <>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>
  ),
};

// --- Page Components ---

const HomePage = ({ setPage }) => (
  <div className="page-content">
    <h1 className="title">Cleaner Hub</h1>
    <p className="subtitle">Your one-stop solution for managing your cleaning crew.</p>
    <div className="button-group">
      <button onClick={() => setPage('login')} className="btn btn-primary">
        <Icon path={ICONS.login} /> Login
      </button>
      <button onClick={() => setPage('register')} className="btn btn-secondary">
        <Icon path={ICONS.userPlus} /> Register
      </button>
    </div>
  </div>
);

const LoginPage = ({ setPage, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/cleanerapi/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        onLoginSuccess(data);
      } else {
        setError('Login failed. Please check your username and password.');
      }
    } catch {
      setError('Cannot connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-content">
      <h2 className="form-title">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <Icon path={ICONS.user} />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <Icon path={ICONS.lock} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <p className="form-footer">
        No account yet?{' '}
        <button onClick={() => setPage('register')} className="link-button">
          Register now
        </button>
      </p>
    </div>
  );
};

const RegisterPage = ({ setPage }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/cleanerapi/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, password }),
      });
      if (response.ok) {
        setIsError(false);
        setMessage('Registration successful! You can now log in.');
        setName('');
        setUsername('');
        setPassword('');
      } else {
        setIsError(true);
        setMessage('Registration failed. Username might already be taken.');
      }
    } catch {
      setIsError(true);
      setMessage('Cannot connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-content">
      <h2 className="form-title">Create Your Account</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <Icon path={ICONS.user} />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <Icon path={ICONS.userPlus} />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <Icon path={ICONS.lock} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {message && (
          <p className={isError ? 'error-message' : 'success-message'}>
            {message}
          </p>
        )}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      <p className="form-footer">
        Already have an account?{' '}
        <button onClick={() => setPage('login')} className="link-button">
          Login
        </button>
      </p>
    </div>
  );
};

const DashboardPage = ({ user, onLogout, onDeleteAccount }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDeleteAccount();
  };

  return (
    <div className="page-content">
      <h1 className="dashboard-welcome">Hi, {user.name}!</h1>
      <p className="subtitle">Welcome to your personal dashboard.</p>

      {isConfirmingDelete ? (
        <div className="confirm-dialog">
          <Icon path={ICONS.alert} size={32} />
          <h3>Are you sure?</h3>
          <p>Deleting your account is permanent and cannot be undone.</p>
          <div className="button-group">
            <button
              className="btn btn-secondary"
              onClick={() => setIsConfirmingDelete(false)}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete My Account'}
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsConfirmingDelete(true)} className="btn btn-danger">
          <Icon path={ICONS.trash} /> Delete Account
        </button>
      )}
      <button onClick={onLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('cleanerUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setPage('dashboard');
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('cleanerUser', JSON.stringify(userData));
    setUser(userData);
    setPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('cleanerUser');
    setUser(null);
    setPage('home');
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    try {
      const response = await fetch(`${API_BASE_URL}/cleanerapi/delete/by-username/${user.username}`, {
        method: 'DELETE',
      });

      const data = await response.json(); // read the JSON response from backend

      if (response.ok) {
        alert(data.message); // shows "Account deleted successfully"
      } else {
        alert(data.message); // shows "Account not found" or error message
      }
    } catch (error) {
      console.error('Failed to delete account:', error);
      alert('Could not delete account. Please try again later.');
    } finally {
      handleLogout(); // log out or redirect after attempt
    }
  };


  const renderPage = () => {
    switch (page) {
      case 'login':
        return <LoginPage setPage={setPage} onLoginSuccess={handleLoginSuccess} />;
      case 'register':
        return <RegisterPage setPage={setPage} />;
      case 'dashboard':
        return (
          <DashboardPage
            user={user}
            onLogout={handleLogout}
            onDeleteAccount={handleDeleteAccount}
          />
        );
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <main className="app-container">
      <div className="card">{renderPage()}</div>
    </main>
  );
}