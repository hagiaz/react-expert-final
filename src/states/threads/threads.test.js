/* eslint-disable no-unused-vars */
/**
 * Skenario pengujian state shared
 *
 *   - Harus mengembalikan initial state ketika menerima action yang tidak diketahui
 *   - Harus menangani setThreads dengan benar dan menerima kategori
 *   - Harus menangani addThread dengan benar
 *   - Harus menangani addComment dengan benar dalam detail thread
 */

import {describe, it, expect} from 'vitest';
import threadsReducer, {
  setThreads,
  addThread,
  setThreadDetail,
  addComment,
} from './reducer';

describe('threadsReducer function', () => {
  it('should return the initial state when given unknown action', () => {
    const initialState = {
      threads: [],
      threadDetail: null,
      categories: [],
      selectedCategory: '',
    };
    const action = {type: 'UNKNOWN_ACTION'};

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should handle setThreads correctly and extract categories', () => {
    const threadData = [
      {id: '1', title: 'AAA', category: 'Testing'},
      {id: '2', title: 'BBB', category: 'Development'},
      {id: '3', title: 'CCC', category: 'Testing'},
    ];
    const action = setThreads(threadData);

    const nextState = threadsReducer(undefined, action);

    expect(nextState.threads).toEqual(threadData);
    expect(nextState.categories).toEqual(['Testing', 'Development']);
  });

  it('should handle addThread correctly', () => {
    const initialState = {
      threads: [{id: '1', title: 'Some Thread'}],
      threadDetail: null,
      categories: [],
      selectedCategory: '',
    };

    const newThread = {id: '2', title: 'Some New Thread'};
    const nextState = threadsReducer(initialState, addThread(newThread));

    expect(nextState.threads).toEqual([newThread, ...initialState.threads]);
  });

  it('should handle addComment correctly for threadDetail', () => {
    const initialState = {
      threads: [],
      threadDetail: {
        id: 'thread-1',
        comments: [],
      },
      categories: [],
      selectedCategory: '',
    };

    const newComment = {
      id: 'comment-1',
      content: 'Mantaaaaaaaaaaaaap!',
    };

    const action = addComment({
      threadId: 'thread-1',
      comment: newComment,
    });

    const nextState = threadsReducer(initialState, action);
    expect(nextState.threadDetail.comments).toHaveLength(1);
    expect(nextState.threadDetail.comments[0]).toEqual(newComment);
  });
});
