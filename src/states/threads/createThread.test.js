/**
 * Skenario pengujian createThread thunk
 *
 *   - Harus dapat memanggil dispatch jika permintaan berhasil
 *   - Harus mengembalikan ID thread baru jika berhasil
 *   - Harus memanggil dispatch dengan setLoading(true) dan setLoading(false) meskipun permintaan gagal
 *   - Harus mengembalikan null jika terjadi error saat membuat thread
 */

import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { createThread } from './action';
import api from '../../services/api';
import { setLoading } from '../shared/action';
import { addThread } from './reducer';

vi.mock('../../services/api');
vi.mock('../shared/action', () => ({
  setLoading: vi.fn((isLoading) => ({ type: 'shared/setLoading', payload: isLoading })),
}));
vi.mock('./reducer', () => ({
  addThread: vi.fn((thread) => ({ type: 'threads/addThread', payload: thread })),
}));

describe('createThread thunk', () => {
  const newThread = {
    id: 'thread-new',
    title: 'Some new thread',
    body: 'Lorem ipsum dolor sit amet!',
    category: 'Tech',
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

  it('should dispatch actions correctly and return thread ID on success', async () => {
    api.post.mockResolvedValue({
      data: {
        data: {
          thread: newThread,
        },
      },
    });

    const result = await createThread(newThread)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(dispatch).toHaveBeenCalledWith(addThread(newThread));
    expect(dispatch).toHaveBeenCalledWith(setLoading(false));
    expect(result).toBe(newThread.id);
  });

  it('should return null and still dispatch loading actions on failure', async () => {
    api.post.mockRejectedValue(new Error('Failed to create thread'));

    const result = await createThread(newThread)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(dispatch).not.toHaveBeenCalledWith(setLoading(false));
    expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: addThread.type }));
    expect(result).toBeNull();
  });
});
