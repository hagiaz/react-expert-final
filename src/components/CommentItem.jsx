import React from 'react';
import {formatDistanceToNow} from 'date-fns';
import {id} from 'date-fns/locale';
import parse from 'html-react-parser';

function CommentItem({comment}) {
  return (
    <div className="comment-item">
      <div className="comment-header">
        <div className="comment-owner">
          {comment.owner.avatar && (
            <img src={comment.owner.avatar} alt={comment.owner.name} className="avatar" />
          )}
          <span className="owner-name">{comment.owner.name}</span>
        </div>
        <span className="comment-date">
          {formatDistanceToNow(new Date(comment.createdAt), {
            addSuffix: true,
            locale: id,
          })}
        </span>
      </div>
      <div className="comment-content">
        {parse(comment.content)}
      </div>
    </div>
  );
}

export default CommentItem;
