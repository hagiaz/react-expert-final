import styled from 'styled-components';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../states/authUser/action';

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0077cc;
  padding: 0.75rem 1rem;
  color: white;
  font-size: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }
`;

const Brand = styled.div`
  a {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    text-align: center;
  }
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background-color 0.3s;
  text-align: center;

  &:hover {
    background-color: #005fa3;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LogoutButton = styled.button`
  all: unset;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background-color 0.3s;
  text-align: center;

  &:hover {
    background-color: #005fa3;
  }
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
