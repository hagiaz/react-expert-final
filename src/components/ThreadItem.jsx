import React from 'react';
import {Link} from 'react-router-dom';
import {formatDistanceToNow} from 'date-fns';
import {id} from 'date-fns/locale';
import parse from 'html-react-parser';
import styled from 'styled-components';

const ThreadWrapper = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  padding: 1.25rem;
  margin-bottom: 18px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(255,255,255,0.03);
  transition: transform 0.14s ease, box-shadow 0.14s ease;

  &:hover{transform:translateY(-6px);box-shadow:0 12px 30px rgba(2,6,23,0.6)}

  @media (max-width: 768px) {padding:0.9rem}
`;

const ThreadCategory = styled.div`
  background:transparent;color:var(--accent);padding:0.35rem 0.7rem;border-radius:999px;border:1px solid rgba(79,159,255,0.12);font-size:0.95rem;display:inline-block;margin-bottom:0.75rem;font-weight:600
`;

const ThreadTitleLink = styled(Link)`
  text-decoration: none;

  h3{font-size:1.35rem;color:var(--text);margin:0;line-height:1.15;transition:color 0.12s ease}
  &:hover h3{color:var(--accent)}
`;

const ThreadBody = styled.div`
  font-size: 0.98rem;margin:0.75rem 0;color:var(--muted);line-height:1.5;white-space:pre-line;max-height:5.4rem;overflow:hidden
`;

const ThreadMeta = styled.div`
  display:flex;justify-content:space-between;align-items:center;margin-top:0.5rem;font-size:0.9rem;color:var(--muted)
`;

const ThreadOwner = styled.div`display:flex;align-items:center;gap:0.6rem`;

const Avatar = styled.img`width:36px;height:36px;border-radius:999px;margin-right:8px;object-fit:cover`;

const ThreadDetails = styled.div`
  display: flex;
  align-items: center;
`;

const ThreadDate = styled.span`font-size:0.85rem;color:var(--muted);margin-right:1rem`;

const ThreadComments = styled.span`
  margin-right: 1rem;
`;

function ThreadItem({thread, owner}) {
  const truncateBody = (html) => {
    const parsed = parse(html);
    let text = '';
    if (typeof parsed === 'object' && parsed !== null) {
      text = parsed.props?.children || '';
    } else {
      text = parsed.toString();
    }
    return text.length > 150 ? `${text.substring(0, 150)}...` : text;
  };

  return (
    <ThreadWrapper>
      <ThreadCategory>
        {thread.category ? `#${thread.category}` : 'Uncategorized'}
      </ThreadCategory>

      <ThreadTitleLink to={`/threads/${thread.id}`}>
        <h3>{thread.title}</h3>
      </ThreadTitleLink>

      <ThreadBody>{truncateBody(thread.body)}</ThreadBody>

      <ThreadMeta>
        <ThreadOwner>
          {owner?.avatar && (
            <Avatar src={owner.avatar} alt={owner.name} />
          )}
          <span>By {owner?.name || thread.ownerId}</span>
        </ThreadOwner>
        <ThreadDetails>
          <ThreadDate>
            {formatDistanceToNow(new Date(thread.createdAt), {
              addSuffix: true,
              locale: id,
            })}
          </ThreadDate>
          <ThreadComments>{thread.totalComments} komentar</ThreadComments>
        </ThreadDetails>
      </ThreadMeta>
    </ThreadWrapper>
  );
}

export default ThreadItem;
