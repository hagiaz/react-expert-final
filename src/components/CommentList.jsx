import React from 'react';
import CommentItem from './CommentItem';

function CommentList({comments}) {
  return (
    <div className="comment-list">
      <h3>Komentar ({comments.length})</h3>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      ) : (
        <p className="no-comments">Belum ada komentar</p>
      )}
    </div>
  );
}

export default CommentList;
