import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchThreads} from '../states/threads/action';
import {fetchUsers} from '../states/users/action';
import ThreadItem from './ThreadItem';
import CategoryFilter from './CategoryFilter';

function ThreadList() {
  const dispatch = useDispatch();
  const {threads, selectedCategory} = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const {isLoading} = useSelector((state) => state.shared);

  useEffect(() => {
    dispatch(fetchThreads());
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredThreads = selectedCategory ?
    threads.filter((thread) => thread.category === selectedCategory) :
    threads;

  const getOwnerInfo = (ownerId) => {
    return users.find((user) => user.id === ownerId);
  };

  if (isLoading && threads.length === 0) {
    return <div className="loading-message">Loading threads...</div>;
  }

  return (
    <div className="thread-list-container">
      <CategoryFilter />
      <div className="thread-list">
        {filteredThreads.length > 0 ? (
          filteredThreads.map((thread) => {
            const owner = getOwnerInfo(thread.ownerId);
            return (
              <ThreadItem key={thread.id} thread={thread} owner={owner} />
            );
          })
        ) : (
          <div className="no-threads">
            {selectedCategory ?
              `Tidak ada thread dengan kategori ${selectedCategory}` :
              'Tidak ada thread tersedia'}
          </div>
        )}
      </div>
    </div>
  );
}

export default ThreadList;
