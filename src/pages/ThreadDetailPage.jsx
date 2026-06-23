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
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

const BackButton = styled.button`
  background: transparent;
  color: var(--text);
  border: 1px solid rgba(255,255,255,0.04);
  padding: 8px 14px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 18px;
  transition: transform 0.12s ease, background 0.12s ease;

  &:hover {transform:translateY(-2px);background:rgba(255,255,255,0.02)}
`;

const ThreadDetailWrapper = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  padding: 20px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(255,255,255,0.03);
`;

const ThreadCategory = styled.div`
  background:transparent;
  color:var(--accent);
  padding:0.35rem 0.7rem;
  border-radius:999px;
  font-size:0.95rem;
  display:inline-block;
  margin-bottom:0.75rem;
  font-weight:600;
  border:1px solid rgba(79,159,255,0.10);
`;

const ThreadTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  color:var(--text);
`;

const ThreadMeta = styled.div`
  display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:0.95rem;color:var(--muted)
`;

const ThreadOwner = styled.div`display:flex;align-items:center;gap:0.6rem`;

const Avatar = styled.img`width:44px;height:44px;border-radius:999px;margin-right:8px;object-fit:cover`;

const ThreadDate = styled.span`font-size:13px;color:var(--muted);margin-left:8px`;

const ThreadBody = styled.div`font-size:1rem;margin:0.9rem 0;color:var(--text);line-height:1.6;white-space:pre-line`;

const CommentsSection = styled.div`margin-top:36px;padding-top:18px;border-top:1px solid rgba(255,255,255,0.03)`;

const LoginPrompt = styled.div`margin-top:20px;font-size:0.95rem;color:var(--muted);a{color:var(--accent);text-decoration:none}&:hover a{text-decoration:underline}`;

const LoadingMessage = styled.div`text-align:center;padding:36px;color:var(--muted)`;

const ErrorMessage = styled.div`text-align:center;color:#ff8a8a;font-weight:700;padding:36px`;

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
