import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchThreadDetail} from '../states/threads/action';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import {formatDistanceToNow} from 'date-fns';
import {id as idLocale} from 'date-fns/locale';
import parse from 'html-react-parser';

function ThreadDetailPage() {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {threadDetail} = useSelector((state) => state.threads);
  const {isLoading} = useSelector((state) => state.shared);
  const {isAuthenticated} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchThreadDetail(id));
  }, [id, dispatch]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading && !threadDetail) {
    return <div className="loading-message">Loading thread...</div>;
  }

  if (!threadDetail) {
    return <div className="error-message">Thread tidak ditemukan</div>;
  }

  return (
    <div className="thread-detail-page">
      <button onClick={handleBack} className="back-button">
        &larr; Kembali
      </button>

      <div className="thread-detail">
        <div className="thread-category">
          {threadDetail.category ? `#${threadDetail.category}` : 'Uncategorized'}
        </div>

        <h1 className="thread-title">{threadDetail.title}</h1>

        <div className="thread-meta">
          <div className="thread-owner">
            {threadDetail.owner.avatar && (
              <img
                src={threadDetail.owner.avatar}
                alt={threadDetail.owner.name}
                className="avatar"
              />
            )}
            <span>{threadDetail.owner.name}</span>
          </div>
          <span className="thread-date">
            {formatDistanceToNow(new Date(threadDetail.createdAt), {
              addSuffix: true,
              locale: idLocale,
            })}
          </span>
        </div>

        <div className="thread-body">
          {parse(threadDetail.body)}
        </div>
      </div>

      <div className="thread-comments-section">
        <CommentList comments={threadDetail.comments} />

        {isAuthenticated ? (
          <CommentForm threadId={id} />
        ) : (
          <div className="login-prompt">
            <p>Silakan <a href="/login">login</a> untuk menambahkan komentar</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ThreadDetailPage;
