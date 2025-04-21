import React from 'react';
import {useSelector} from 'react-redux';

function LoadingBar() {
  const {isLoading} = useSelector((state) => state.shared);

  if (!isLoading) return null;

  return (
    <div className="loading-bar">
      <div className="loading-progress"></div>
    </div>
  );
}

export default LoadingBar;
