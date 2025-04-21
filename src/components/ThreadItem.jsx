import React from 'react';
import {Link} from 'react-router-dom';
import {formatDistanceToNow} from 'date-fns';
import {id} from 'date-fns/locale';
import parse from 'html-react-parser';
import styled from 'styled-components';

const ThreadWrapper = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ThreadCategory = styled.div`
  background-color: #0077cc;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 1rem;
  display: inline-block;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.25rem 0.75rem;
  }
`;

const ThreadTitleLink = styled(Link)`
  text-decoration: none;

  h3 {
    font-size: 1.75rem;
    color: #333;
    margin: 0;
    transition: color 0.3s ease;

    &:hover {
      color: #0077cc;
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

const ThreadBody = styled.div`
  font-size: 1rem;
  margin: 1rem 0 40px;
  color: #555;
  line-height: 1.6;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
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

const ThreadDetails = styled.div`
  display: flex;
  align-items: center;
`;

const ThreadDate = styled.span`
  font-size: 14px;
  color: #888;
  margin-right: 1rem;

  @media (max-width: 500px) {
    width: 80%;
  }
`;

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
