import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../states/authUser/action';

function Navbar() {
  const {isAuthenticated, user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Forum Diskusi - Web App</Link>
      </div>
      <div className="navbar-menu">
        {isAuthenticated ? (
          <>
            <span className="navbar-item">Halo, {user?.name}</span>
            <Link to="/create-thread" className="navbar-item">Buat Thread</Link>
            <button onClick={handleLogout} className="navbar-item logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-item">Login</Link>
            <Link to="/register" className="navbar-item">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
