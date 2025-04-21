/**
 * Skenario pengujian fetchThreads thunk
 *
 *   - Harus dapat memanggil actions (Mendapatkan threads) secara benar jika permintaan berhasil
 */

import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { fetchThreads } from './action';
import { setThreads } from './reducer';
import { setLoading } from '../shared/action';
import api from '../../services/api';

vi.mock('../../services/api');
vi.mock('../shared/action', () => ({
  setLoading: vi.fn((isLoading) => ({ type: 'shared/setLoading', payload: isLoading })),
}));
vi.mock('./reducer', () => ({
  setThreads: vi.fn((threads) => ({ type: 'threads/setThreads', payload: threads })),
}));

describe('fetchThreads thunk', () => {
  it('should dispatch actions correctly when fetching threads succeeds', async () => {
    const fakeThreads = [{ id: 'thread-1', title: 'New Thread' }];
    api.get.mockResolvedValueOnce({ data: { data: { threads: fakeThreads } } });

    const dispatch = vi.fn();

    await fetchThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(dispatch).toHaveBeenCalledWith(setThreads(fakeThreads));
    expect(dispatch).toHaveBeenCalledWith(setLoading(false));
  });
});
