import styled from 'styled-components';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createComment} from '../states/comments/action';

const FormContainer = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  padding: 18px;
  margin-top: 28px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(255,255,255,0.03);
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
  background: linear-gradient(90deg,var(--accent),var(--accent-2));
  color: #02223a;border:none;padding:10px 16px;font-size:15px;cursor:pointer;border-radius:10px;transition:transform .12s ease,opacity .12s ease

  &:hover{transform:translateY(-2px)}
  &:disabled{opacity:0.55;cursor:not-allowed}
`;

function CommentForm({threadId}) {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state) => state.shared);

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
