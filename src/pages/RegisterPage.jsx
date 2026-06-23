import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {registerUser} from '../states/authUser/action';
import {clearAuthError} from '../states/authUser/reducer';

const PageContainer = styled.div`max-width:420px;margin:2rem auto;padding:12px`;
const PageCard = styled.div`background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));border-radius:12px;padding:20px;box-shadow:var(--shadow);border:1px solid rgba(255,255,255,0.03)`;
const Title = styled.h1`font-size:1.5rem;color:var(--text);margin-bottom:1rem;text-align:center`;
const FormGroup = styled.div`margin-bottom:1rem;text-align:left`;
const Label = styled.label`display:block;font-size:0.95rem;color:var(--muted);margin-bottom:0.5rem`;
const Input = styled.input`width:100%;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.02);color:var(--text);box-sizing:border-box;transition:transform .12s ease &:focus{border-color:rgba(79,159,255,0.9);transform:translateY(-1px)}`;
const SubmitButton = styled.button`width:100%;background:linear-gradient(90deg,var(--accent),var(--accent-2));color:#02223a;border:none;padding:.7rem;border-radius:10px;font-weight:700;margin-top:0.5rem;cursor:pointer;transition:transform .12s ease &:hover{transform:translateY(-3px)}&:disabled{opacity:.6}`;
const ErrorMessage = styled.div`background-color:rgba(255,80,80,0.06);color:#ff9b9b;padding:0.75rem;border-radius:8px;margin-bottom:1rem;text-align:center`;
const RedirectText = styled.p`margin-top:1rem;text-align:center;color:var(--muted);a{color:var(--accent);text-decoration:none;font-weight:700}`;

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
    <PageContainer>
      <PageCard>
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
      </PageCard>
      <RedirectText>
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </RedirectText>
    </PageContainer>
  );
}

export default RegisterPage;
