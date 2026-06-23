import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import ThreadList from '../components/ThreadList';

const CreateThreadButton = styled(Link)`
  text-decoration: none;display:inline-flex;align-items:center;gap:.5rem;padding:.6rem .9rem;border-radius:10px;background:linear-gradient(90deg,var(--accent),#6fb1ff);color:#02223a;font-weight:700;box-shadow:var(--shadow);transition:transform .12s ease

  &:hover{transform:translateY(-3px)}
  @media (max-width:768px){font-size:1rem;padding:.5rem .75rem}
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
