import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchThreadDetail} from '../states/threads/action';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

function DetailPage() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {detailThread} = useSelector((state) => state.threads);
  const {isLoading} = useSelector((state) => state.shared);
  const {isAuthenticated} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchThreadDetail(id));
  }, [id, dispatch]);

  if (isLoading) {
    return <div className="loading-bar">Loading...</div>;
  }

  if (!detailThread) {
    return <div>Thread tidak ditemukan</div>;
  }

  return (
    <div className="detail-page">
      <h1>{detailThread.title}</h1>
      <div className="thread-owner">
        <img src={detailThread.owner.avatar} alt={detailThread.owner.name} />
        <span>{detailThread.owner.name}</span>
      </div>
      <div className="thread-content" dangerouslySetInnerHTML={{__html: detailThread.body}} />
      <div className="thread-meta">
        <span>Created: {new Date(detailThread.createdAt).toLocaleString()}</span>
        <span>Category: {detailThread.category || 'Uncategorized'}</span>
      </div>

      <h2>Comments ({detailThread.comments.length})</h2>
      <CommentList comments={detailThread.comments} />

      {isAuthenticated ? (
        <CommentForm threadId={id} />
      ) : (
        <p>Silahkan login untuk menambahkan komentar</p>
      )}
    </div>
  );
}

export default DetailPage;
