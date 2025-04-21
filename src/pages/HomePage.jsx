import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import ThreadList from '../components/ThreadList';

function HomePage() {
  const {isAuthenticated} = useSelector((state) => state.auth);

  return (
    <div className="home-page">
      <div className="page-header">
        {isAuthenticated && (
          <Link to="/create-thread" className="create-thread-button">
            + Buat Thread Baru
          </Link>
        )}
      </div>
      <ThreadList />
    </div>
  );
}

export default HomePage;
