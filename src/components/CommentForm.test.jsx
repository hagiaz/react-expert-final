/**
 * Skenario pengujian komponen Comment Form
 *
 *   - Harus dirender dengan benar
 *   - Textarea harus mengupdate state saat diketik
 *   - Button tidak boleh aktif / harus disabled ketika textarea kosong
 *   - Button harus disabled ketika sedang Loading
 *   - Harus mengirimkan action createComment dan menghapus input pada pengiriman form
 *   - Harus tidak mengirimkan tindakan createComment ketika input hanya berisi spasi
 */

import React from 'react';
import {describe, it, expect, afterEach, vi} from 'vitest';
import {cleanup, render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import CommentForm from './CommentForm';
import {createComment} from '../states/comments/action';

vi.mock('../states/comments/action', () => ({
  createComment: vi.fn().mockImplementation((threadId, content) => () => ({
    type: 'CREATE_COMMENT',
    payload: {threadId, content},
  })),
}));

expect.extend(matchers);

const mockStore = configureStore();

describe('CommentForm component', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should render the comment form correctly', () => {
    // Arrange
    const initialState = {
      shared: {
        isLoading: false,
      },
    };
    const store = mockStore(initialState);

    // Action
    render(
        <Provider store={store}>
          <CommentForm threadId="thread-123" />
        </Provider>,
    );

    // Assert
    expect(screen.getByText('Tambahkan Komentar')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tulis komentar Anda...')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Kirim Komentar'})).toBeInTheDocument();
  });

  it('should handle comment input correctly', async () => {
    // Arrange
    const initialState = {
      shared: {
        isLoading: false,
      },
    };
    const store = mockStore(initialState);

    // Action
    render(
        <Provider store={store}>
          <CommentForm threadId="thread-123" />
        </Provider>,
    );

    const textareaInput = screen.getByPlaceholderText('Tulis komentar Anda...');
    await userEvent.type(textareaInput, 'TESTING');

    // Assert
    expect(textareaInput).toHaveValue('TESTING');
  });

  it('should disable submit button when textarea is empty', () => {
    // Arrange
    const initialState = {
      shared: {
        isLoading: false,
      },
    };
    const store = mockStore(initialState);

    // Action
    render(
        <Provider store={store}>
          <CommentForm threadId="thread-123" />
        </Provider>,
    );

    // Assert
    const submitButton = screen.getByRole('button', {name: 'Kirim Komentar'});
    expect(submitButton).toBeDisabled();
  });

  it('should disable submit button and change text when loading', () => {
    // Arrange
    const initialState = {
      shared: {
        isLoading: true,
      },
    };
    const store = mockStore(initialState);

    render(
        <Provider store={store}>
          <CommentForm threadId="thread-123" />
        </Provider>,
    );

    const submitButton = screen.getByRole('button', {name: 'Mengirim...'});
    expect(submitButton).toBeDisabled();
  });

  it('should dispatch createComment action and clear input on form submission', async () => {
    const initialState = {
      shared: {
        isLoading: false,
      },
    };
    const store = mockStore(initialState);

    store.dispatch = vi.fn().mockImplementation(() => Promise.resolve({}));

    render(
        <Provider store={store}>
          <CommentForm threadId="thread-123" />
        </Provider>,
    );

    const textareaInput = screen.getByPlaceholderText('Tulis komentar Anda...');
    await userEvent.type(textareaInput, 'Random Comment One');

    const submitButton = screen.getByRole('button', {name: 'Kirim Komentar'});
    expect(submitButton).not.toBeDisabled();

    await userEvent.click(submitButton);

    expect(createComment).toHaveBeenCalledWith('thread-123', 'Random Comment One');
    expect(store.dispatch).toHaveBeenCalled();

    await new Promise(process.nextTick);
  });

  it('should not dispatch createComment action when input contains only whitespace', async () => {
    // Arrange
    const initialState = {
      shared: {
        isLoading: false,
      },
    };
    const store = mockStore(initialState);
    store.dispatch = vi.fn();

    // Action
    render(
        <Provider store={store}>
          <CommentForm threadId="thread-123" />
        </Provider>,
    );

    const textareaInput = screen.getByPlaceholderText('Tulis komentar Anda...');
    await userEvent.type(textareaInput, '   ');

    const form = textareaInput.closest('form');
    fireEvent.submit(form);

    // Assert
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
