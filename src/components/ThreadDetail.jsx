import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchThreadDetail} from '../states/threads/action';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import styled from 'styled-components';

const ThreadOwner = styled.div`
  display: flex;
  align-items: center;
`;

const OwnerAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const OwnerName = styled.span`
  font-weight: bold;
`;

const ThreadMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 0.875rem;
  color: #777;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

function DetailPage() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {detailThread} = useSelector((state) => state.threads);
  const {isLoading} = useSelector((state) => state.shared);
  const {isAuthenticated} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchThreadDetail(id));
  }, [id, dispatch]);

  if (isLoading) {
    return <LoadingBar>Loading...</LoadingBar>;
  }

  if (!detailThread) {
    return <NotFoundMessage>Thread tidak ditemukan</NotFoundMessage>;
  }

  return (
    <DetailPageContainer>
      <ThreadTitle>{detailThread.title}</ThreadTitle>

      <ThreadOwner>
        <OwnerAvatar
          src={detailThread.owner.avatar}
          alt={detailThread.owner.name}
        />
        <OwnerName>{detailThread.owner.name}</OwnerName>
      </ThreadOwner>

      <ThreadContent
        dangerouslySetInnerHTML={{__html: detailThread.body}}
      />

      <ThreadMeta>
        <MetaItem>Created: {new Date(detailThread.createdAt).toLocaleString()}</MetaItem>
        <MetaItem>Category: {detailThread.category || 'Uncategorized'}</MetaItem>
      </ThreadMeta>

      <CommentsTitle>Comments ({detailThread.comments.length})</CommentsTitle>
      <CommentList comments={detailThread.comments} />

      {isAuthenticated ? (
        <CommentForm threadId={id} />
      ) : (
        <LoginPrompt>Silahkan login untuk menambahkan komentar</LoginPrompt>
      )}
    </DetailPageContainer>
  );
}

export default DetailPage;
