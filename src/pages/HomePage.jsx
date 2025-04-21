import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import ThreadList from '../components/ThreadList';

const CreateThreadButton = styled(Link)`
  text-decoration: none;
  font-size: 1.75rem;
  color: #333;
  margin: 0;
  transition: color 0.3s ease;

  &:hover {
    color: #0077cc;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

function HomePage() {
  const {isAuthenticated} = useSelector((state) => state.auth);

  return (
    <div className="home-page">
      <div className="page-header">
        {isAuthenticated && (
          <CreateThreadButton to="/create-thread" className="create-thread-button">
            + Buat Thread Baru
          </CreateThreadButton>
        )}
      </div>
      <ThreadList />
    </div>
  );
}

export default HomePage;
