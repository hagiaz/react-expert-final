import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import {getUserProfile} from './states/authUser/action';
import LoadingBar from './components/LoadingBar';
import ThreadDetailPage from './pages/ThreadDetailPage';
import CreateThreadPage from './pages/CreateThreadPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getUserProfile());
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <LoadingBar />
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/threads/:id" element={<ThreadDetailPage />} />
            <Route path="/create-thread" element={<CreateThreadPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
