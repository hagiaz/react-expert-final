import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {registerUser} from '../states/authUser/action';
import {clearAuthError} from '../states/authUser/reducer';

// Styled Components
const PageWrapper = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
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

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #0077cc;
  color: white;
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #005fa3;
  }
`;

const ErrorMessage = styled.div`
  background-color: #fdd;
  color: #a00;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  text-align: center;
`;

const RedirectText = styled.p`
  margin-top: 1rem;
  text-align: center;

  a {
    color: #0077cc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Component
function RegisterPage() {
  const [name, setName] = useState('');
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
    const success = await dispatch(registerUser({name, email, password}));
    if (success) {
      navigate('/login');
    }
  };

  return (
    <PageWrapper>
      <Title>Register</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Nama</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Register'}
        </SubmitButton>
      </form>
      <RedirectText>
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </RedirectText>
    </PageWrapper>
  );
}

export default RegisterPage;
