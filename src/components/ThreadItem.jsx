import React from 'react';
import {Link} from 'react-router-dom';
import {formatDistanceToNow} from 'date-fns';
import {id} from 'date-fns/locale';
import parse from 'html-react-parser';

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
    <div className="thread-item">
      <div className="thread-category">
        {thread.category ? `#${thread.category}` : 'Uncategorized'}
      </div>

      <Link to={`/threads/${thread.id}`} className="thread-title">
        <h3>{thread.title}</h3>
      </Link>

      <div className="thread-body">{truncateBody(thread.body)}</div>

      <div className="thread-meta">
        <div className="thread-owner">
          {owner?.avatar && (
            <img
              src={owner.avatar}
              alt={owner.name}
              className="avatar"
              style={{width: '24px', height: '24px', borderRadius: '50%', marginRight: '8px'}}
            />
          )}
          <span>By {owner?.name || thread.ownerId}</span>
        </div>
        <div className="thread-details">
          <span className="thread-date">
            {formatDistanceToNow(new Date(thread.createdAt), {
              addSuffix: true,
              locale: id,
            })}
          </span>
          <span className="thread-comments">
            {thread.totalComments} komentar
          </span>
        </div>
      </div>
    </div>
  );
}

export default ThreadItem;
