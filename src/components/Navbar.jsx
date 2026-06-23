import styled from 'styled-components';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../states/authUser/action';

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, rgba(79,159,255,0.12), rgba(126,224,168,0.06));
  backdrop-filter: blur(6px);
  padding: 0.9rem 1.25rem;
  color: var(--text);
  font-size: 1rem;
  border-radius: 12px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(255,255,255,0.03);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
  }
`;

const Brand = styled.div`
  a {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text);
    text-decoration: none;
    letter-spacing: -0.2px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 0;
    text-align: center;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    text-align: center;
  }
`;

const NavItem = styled(Link)`
  color: var(--text);
  text-decoration: none;
  padding: 0.5rem 0.9rem;
  border-radius: 10px;
  transition: background-color 0.18s ease, transform 0.12s ease;
  text-align: center;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255,255,255,0.02);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LogoutButton = styled.button`
  all: unset;
  cursor: pointer;
  color: var(--text);
  padding: 0.5rem 0.9rem;
  border-radius: 10px;
  transition: background 0.18s ease, transform 0.12s ease;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.03);

  &:hover {transform:translateY(-2px);background:rgba(255,255,255,0.02)}
`;

function Navbar() {
  const {isAuthenticated, user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <NavbarWrapper>
      <Brand>
        <Link to="/">Forum Diskusi - Web App</Link>
      </Brand>

      <Menu>
        {isAuthenticated ? (
          <>
            <span style={{alignSelf: 'center'}}>Halo, {user?.name}</span>
            <NavItem to="/create-thread">Buat Thread</NavItem>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <>
            <NavItem to="/login">Login</NavItem>
            <NavItem to="/register">Register</NavItem>
          </>
        )}
      </Menu>
    </NavbarWrapper>
  );
}

export default Navbar;
