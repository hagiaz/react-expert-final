import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {createThread} from '../states/threads/action';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 880px;
  margin: 0 auto;
  padding: 20px;
`;

const PageCard = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(255,255,255,0.03);
`;

const PageTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 18px;
  text-align: center;
  color: var(--text);
`;

const ThreadForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormField = styled.div`display:flex;flex-direction:column;gap:8px`;

const Label = styled.label`font-size:14px;margin-bottom:6px;color:var(--muted);font-weight:600`;

const InputBase = `
  padding: 12px;
  font-size: 14px;
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 10px;
  outline: none;
  background: rgba(255,255,255,0.02);
  color: var(--text);
  transition: border-color 0.12s ease, transform 0.12s ease;

  &:focus {border-color: rgba(79,159,255,0.9);transform:translateY(-1px)}
  &::placeholder{color:var(--muted)}
`;

const Input = styled.input`${InputBase}`;
const TextArea = styled.textarea`${InputBase};min-height:160px;resize:vertical`;

const SubmitButton = styled.button`
  background: linear-gradient(90deg,var(--accent),var(--accent-2));
  color: #02223a;border:none;padding:10px 16px;font-size:15px;cursor:pointer;border-radius:10px;font-weight:700;transition:transform .12s ease,opacity .12s ease;margin-top:6px
  &:hover{transform:translateY(-3px)}&:disabled{opacity:.6;cursor:not-allowed}
`;

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newThreadId = await dispatch(createThread({title, body, category}));

    if (newThreadId) {
      navigate(`/threads/${newThreadId}`);
    } else {
      alert('Gagal membuat thread.');
    }
  };

  return (
    <PageContainer>
      <PageCard>
        <PageTitle>Buat Thread Baru</PageTitle>
        <ThreadForm onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="title">Judul</Label>
            <Input
              type="text"
              id="title"
              placeholder="Judul thread"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="category">Kategori</Label>
            <Input
              type="text"
              id="category"
              placeholder="Kategori (opsional)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="body">Isi Thread</Label>
            <TextArea
              id="body"
              placeholder="Tulis isi thread di sini..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              required
            />
          </FormField>
          <SubmitButton type="submit">Buat Thread</SubmitButton>
        </ThreadForm>
      </PageCard>
    </PageContainer>
  );
}

export default CreateThreadPage;
