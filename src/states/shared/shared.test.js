/**
 * Skenario pengujian state shared
 *
 *   - Harus mengembalikan initial state ketika menerima action yang tidak diketahui
 *   - Harus menangani proses setLoading dengan benar
 */

import {describe, it, expect} from 'vitest';
import sharedReducer, {setLoading} from './reducer';

describe('sharedReducer function', () => {
  it('should return the initial state when given unknown action', () => {
    const initialState = {isLoading: false};
    const action = {type: 'UNKNOWN_ACTION'};

    const nextState = sharedReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should handle setLoading correctly', () => {
    const initialState = {isLoading: false};

    const nextState = sharedReducer(initialState, setLoading(true));
    expect(nextState.isLoading).toBe(true);

    const nextState2 = sharedReducer(nextState, setLoading(false));
    expect(nextState2.isLoading).toBe(false);
  });
});
