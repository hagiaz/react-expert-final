import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {loginUser} from '../states/authUser/action';
import {clearAuthError} from '../states/authUser/reducer';
import styled from 'styled-components';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const LoginTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  text-align: left;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  color: #333;
  background-color: #f9f9f9;
  box-sizing: border-box;

  &:focus {
    border-color: #0077cc;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color: #0077cc;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background-color: #005fa3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const RegisterLink = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;

  a {
    color: #0077cc;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isAuthenticated, error} = useSelector((state) => state.auth);
  const {isLoading} = useSelector((state) => state.shared);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    return () => {
      dispatch(clearAuthError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(loginUser({email, password}));
    if (success) {
      navigate('/');
    }
  };

  return (
    <LoginContainer>
      <LoginTitle>Login</LoginTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </SubmitButton>
      </form>
      <RegisterLink>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </RegisterLink>
    </LoginContainer>
  );
}

export default LoginPage;
