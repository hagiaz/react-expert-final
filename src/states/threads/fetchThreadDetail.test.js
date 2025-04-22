/**
 * Skenario pengujian fetchThreadDetail thunk
 *
 *   - Harus dispatch action setThreadDetail dan loading action jika berhasil
 *   - Harus hanya dispatch loading action dan bukan setThreadDetail jika gagal
*/

import {describe, it, vi, beforeEach, afterEach, expect} from 'vitest';
import {fetchThreadDetail} from './action';
import api from '../../services/api';
import {setLoading} from '../shared/action';
import {setThreadDetail} from './reducer';

vi.mock('../../services/api');
vi.mock('../shared/action', () => ({
  setLoading: vi.fn((isLoading) => ({type: 'shared/setLoading', payload: isLoading})),
}));
vi.mock('./reducer', () => ({
  setThreadDetail: vi.fn((detail) => ({type: 'threads/setThreadDetail', payload: detail})),
}));

describe('fetchThreadDetail thunk', () => {
  const threadDetail = {
    id: 'thread-1',
    title: 'Test Thread',
    body: 'Hello thread!',
    comments: [],
  };

  let dispatch;

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    dispatch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
    console.error.mockRestore();
  });

  it('should dispatch setThreadDetail and loading actions on success', async () => {
    api.get.mockResolvedValue({
      data: {
        data: {
          detailThread: threadDetail,
        },
      },
    });

    await fetchThreadDetail('thread-1')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(dispatch).toHaveBeenCalledWith(setThreadDetail(threadDetail));
    expect(dispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it('should only dispatch loading actions and not setThreadDetail on failure', async () => {
    api.get.mockRejectedValue(new Error('Failed to fetch'));

    await fetchThreadDetail('thread-1')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(dispatch).toHaveBeenCalledWith(setLoading(false));
    expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({type: setThreadDetail.type}));
  });
});
