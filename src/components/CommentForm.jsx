import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createComment} from '../states/comments/action';

function CommentForm({threadId}) {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state) => state.shared);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim()) {
      await dispatch(createComment(threadId, content));
      setContent('');
    }
  };

  return (
    <div className="comment-form">
      <h3>Tambahkan Komentar</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tulis komentar Anda..."
            required
          />
        </div>
        <button type="submit" disabled={isLoading || !content.trim()}>
          {isLoading ? 'Mengirim...' : 'Kirim Komentar'}
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
