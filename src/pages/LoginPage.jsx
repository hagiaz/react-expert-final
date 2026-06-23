import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {loginUser} from '../states/authUser/action';
import {clearAuthError} from '../states/authUser/reducer';
import styled from 'styled-components';

const LoginContainer = styled.div`
  max-width: 420px;
  margin: 2rem auto;
  padding: 18px;
  text-align: center;
`;

const LoginCard = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  box-shadow: var(--shadow);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255,255,255,0.03);
`;

const LoginTitle = styled.h1`
  font-size: 1.6rem;
  color: var(--text);
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  color: #ff9b9b;
  background-color: rgba(255,120,120,0.06);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`margin-bottom:1rem;text-align:left`;

const FormLabel = styled.label`display:block;font-size:0.95rem;color:var(--muted);margin-bottom:0.5rem`;

const FormInput = styled.input`
  width:100%;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.02);color:var(--text);box-sizing:border-box;transition:transform .12s ease
  &:focus{border-color:rgba(79,159,255,0.9);transform:translateY(-1px)}
`;

const SubmitButton = styled.button`
  width:100%;background:linear-gradient(90deg,var(--accent),var(--accent-2));color:#02223a;border:none;padding:.7rem 1rem;border-radius:10px;font-weight:700;margin-top:0.75rem;cursor:pointer;transition:transform .12s ease
  &:hover{transform:translateY(-3px)}&:disabled{opacity:.6}
`;

const RegisterLink = styled.p`margin-top:1rem;font-size:0.95rem;color:var(--muted);a{color:var(--accent);text-decoration:none;font-weight:700}`;

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
      <LoginCard>
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
      </LoginCard>
      <RegisterLink>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </RegisterLink>
    </LoginContainer>
  );
}

export default LoginPage;
