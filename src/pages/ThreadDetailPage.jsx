import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchThreadDetail} from '../states/threads/action';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import {formatDistanceToNow} from 'date-fns';
import {id as idLocale} from 'date-fns/locale';
import parse from 'html-react-parser';
import styled from 'styled-components';

// Styled Components
const PageWrapper = styled.div`
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

const ThreadDetailWrapper = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ThreadCategory = styled.div`
  background-color: #0077cc;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 1rem;
  display: inline-block;
  margin-bottom: 1rem;
`;

const ThreadTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ThreadMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: left;
  margin-bottom: 20px;
  font-size: 0.875rem;
  color: #777;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 500px) {
    display: block;
  }
`;

const ThreadOwner = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 500px) {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
`;

const ThreadDate = styled.span`
  font-size: 14px;
  color: #888;
  margin-right: 1rem;

  @media (max-width: 500px) {
    width: 80%;
  }
`;

const ThreadBody = styled.div`
  font-size: 1rem;
  margin: 1rem 0;
  color: #555;
  line-height: 1.6;
  white-space: pre-line;
`;

const CommentsSection = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
`;

const LoginPrompt = styled.div`
  margin-top: 20px;
  font-size: 0.95rem;

  a {
    color: #0077cc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
  font-weight: bold;
  padding: 40px;
`;

// Component
function ThreadDetailPage() {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {threadDetail} = useSelector((state) => state.threads);
  const {isLoading} = useSelector((state) => state.shared);
  const {isAuthenticated} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchThreadDetail(id));
  }, [id, dispatch]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading && !threadDetail) {
    return <LoadingMessage>Loading thread...</LoadingMessage>;
  }

  if (!threadDetail) {
    return <ErrorMessage>Thread tidak ditemukan</ErrorMessage>;
  }

  return (
    <PageWrapper>
      <BackButton onClick={handleBack}>&larr; Kembali</BackButton>

      <ThreadDetailWrapper>
        <ThreadCategory>
          {threadDetail.category ? `#${threadDetail.category}` : 'Uncategorized'}
        </ThreadCategory>

        <ThreadTitle>{threadDetail.title}</ThreadTitle>

        <ThreadMeta>
          <ThreadOwner>
            {threadDetail.owner.avatar && (
              <Avatar
                src={threadDetail.owner.avatar}
                alt={threadDetail.owner.name}
              />
            )}
            <span>{threadDetail.owner.name}</span>
          </ThreadOwner>
          <ThreadDate>
            {formatDistanceToNow(new Date(threadDetail.createdAt), {
              addSuffix: true,
              locale: idLocale,
            })}
          </ThreadDate>
        </ThreadMeta>

        <ThreadBody>{parse(threadDetail.body)}</ThreadBody>
      </ThreadDetailWrapper>

      <CommentsSection>
        <CommentList comments={threadDetail.comments} />

        {isAuthenticated ? (
          <CommentForm threadId={id} />
        ) : (
          <LoginPrompt>
            <p>Silakan <a href="/login">login</a> untuk menambahkan komentar</p>
          </LoginPrompt>
        )}
      </CommentsSection>
    </PageWrapper>
  );
}

export default ThreadDetailPage;
