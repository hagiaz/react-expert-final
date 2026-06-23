import styled from 'styled-components';
import React from 'react';
import {formatDistanceToNow} from 'date-fns';
import {id} from 'date-fns/locale';
import parse from 'html-react-parser';

const CommentWrapper = styled.div`
  padding: 14px;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  margin-bottom: 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.03);
`;

const CommentHeader = styled.div`display:flex;justify-content:space-between;margin-bottom:10px;align-items:flex-start`;

const CommentOwner = styled.div`display:flex;align-items:center;gap:0.75rem`;

const CommentContent = styled.div`font-size:0.98rem;line-height:1.6;color:var(--text)`;

const OwnerName = styled.span`font-weight:700;color:var(--text)`;

const CommentDate = styled.span`font-size:12px;color:var(--muted)`;

const CommentAvatar = styled.img`width:44px;height:44px;border-radius:999px;margin-right:8px;object-fit:cover`;

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
