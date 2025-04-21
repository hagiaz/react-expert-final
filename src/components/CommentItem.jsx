import styled from 'styled-components';
import React from 'react';
import {formatDistanceToNow} from 'date-fns';
import {id} from 'date-fns/locale';
import parse from 'html-react-parser';

const CommentWrapper = styled.div`
  padding: 15px;
  background-color: #f4f4f4;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  @media (max-width: 500px) {
    display: block;
  }
`;

const CommentOwner = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 500px) {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const CommentContent = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

const OwnerName = styled.span`
  font-weight: bold;
  margin-left: 10px;
`;

const CommentDate = styled.span`
  font-size: 12px;
  color: #888;
`;

const CommentAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

function CommentItem({comment}) {
  return (
    <CommentWrapper>
      <CommentHeader>
        <CommentOwner>
          {comment.owner.avatar && (
            <CommentAvatar src={comment.owner.avatar} alt={comment.owner.name} />
          )}
          <OwnerName>{comment.owner.name}</OwnerName>
        </CommentOwner>
        <CommentDate>
          {formatDistanceToNow(new Date(comment.createdAt), {
            addSuffix: true,
            locale: id,
          })}
        </CommentDate>
      </CommentHeader>
      <CommentContent>
        {parse(comment.content)}
      </CommentContent>
    </CommentWrapper>
  );
}

export default CommentItem;
