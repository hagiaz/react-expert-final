import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createThread } from '../states/threads/action';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const ThreadForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
`;

const InputBase = `
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #4CAF50;
  }
  
  &::placeholder {
    color: #888;
  }
`;

const Input = styled.input`
  ${InputBase}
`;

const TextArea = styled.textarea`
  ${InputBase}
`;

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #45a049;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newThreadId = await dispatch(createThread({ title, body, category }));

    if (newThreadId) {
      navigate(`/threads/${newThreadId}`);
    } else {
      alert('Gagal membuat thread.');
    }
  };

  return (
    <PageContainer>
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
    </PageContainer>
  );
}

export default CreateThreadPage;