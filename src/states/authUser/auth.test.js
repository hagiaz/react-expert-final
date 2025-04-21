/**
 * Skenario pengujian state authUser
 *
 *   - Harus mengembalikan initial state ketika menerima action yang tidak diketahui
 *   - Harus menangani setAuthUser dengan benar
 *   - Harus menangani proses logout dengan benar
 */

import {describe, it, expect} from 'vitest';
import authReducer, {setAuthUser, logout} from './reducer';

describe('authReducer function', () => {
  it('should return the initial state when given unknown action', () => {
    const initialState = {
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    };
    const action = {type: 'UNKNOWN_ACTION'};

    const nextState = authReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should handle setAuthUser correctly', () => {
    const initialState = {
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    };
    const user = {id: 'user-1', name: 'Test'};

    const nextState = authReducer(initialState, setAuthUser(user));

    expect(nextState).toEqual({
      ...initialState,
      user,
      isAuthenticated: true,
    });
  });

  it('should handle logout correctly', () => {
    const initialState = {
      user: {id: 'user-1', name: 'Test'},
      token: 'token-someToken',
      isAuthenticated: true,
      error: null,
    };

    const nextState = authReducer(initialState, logout());

    expect(nextState).toEqual({
      ...initialState,
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });
});
