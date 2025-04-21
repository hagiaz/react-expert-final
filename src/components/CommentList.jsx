import React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';

const CommentListWrapper = styled.div`
  margin-bottom: 20px;
`;

const CommentTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;


function CommentList({comments}) {
  return (
    <CommentListWrapper>
      <CommentTitle>Komentar ({comments.length})</CommentTitle>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      ) : (
        <p className="no-comments">Belum ada komentar</p>
      )}
    </CommentListWrapper>
  );
}

export default CommentList;
