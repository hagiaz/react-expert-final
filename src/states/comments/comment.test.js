/**
 * Skenario pengujian state comments
 *
 *   - Harus mengembalikan initial state ketika menerima action yang tidak diketahui
 *   - Harus menangani proses addComment dengan benar
 */

import {describe, it, expect} from 'vitest';
import commentsReducer, {addComment} from './reducer';

describe('commentsReducer function', () => {
  it('should return the initial state when given unknown action', () => {
    const initialState = {comments: []};
    const action = {type: 'UNKNOWN_ACTION'};

    const nextState = commentsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should handle addComment correctly', () => {
    const initialState = {comments: []};
    const newComment = {
      id: 'comment-1',
      content: 'lorem ipsum dolor sit amit amit',
      userId: 'user-1',
      threadId: 'thread-1',
      createdAt: '2025-04-21T10:00:00.000Z',
    };

    const nextState = commentsReducer(initialState, addComment(newComment));

    expect(nextState.comments).toHaveLength(1);
    expect(nextState.comments[0]).toEqual(newComment);
  });
});
