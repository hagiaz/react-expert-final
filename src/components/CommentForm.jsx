import styled from 'styled-components';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../states/comments/action';

const FormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-top: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;
  min-height: 100px;
  resize: vertical;

  &:focus {
    border-color: #4CAF50;
  }

  &::placeholder {
    color: #888;
  }
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

function CommentForm({ threadId }) {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.shared);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim()) {
      await dispatch(createComment(threadId, content));
      setContent('');
    }
  };

  return (
    <FormContainer>
      <FormTitle>Tambahkan Komentar</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tulis komentar Anda..."
            required
          />
        </FormGroup>
        <SubmitButton type="submit" disabled={isLoading || !content.trim()}>
          {isLoading ? 'Mengirim...' : 'Kirim Komentar'}
        </SubmitButton>
      </form>
    </FormContainer>
  );
}

export default CommentForm;