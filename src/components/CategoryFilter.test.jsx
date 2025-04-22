/**
 * Skenario pengujian komponen Category Filter
 *
 *   - Harus dapat merender dengan benar semua kategori dari store
 *   - Tombol kategori harus memiliki class 'active' jika sedang dipilih
 *   - Action setSelectedCategory harus dipanggil jika memilih kategori
 *   - Action setSelectedCategory dengan nilai kosong harus dipanggil jika tombol 'Semua' diklik
 */

import React from 'react';
import {describe, it, expect, afterEach, vi} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import CategoryFilter from './CategoryFilter';
import {setSelectedCategory} from '../states/threads/reducer';

expect.extend(matchers);

const mockStore = configureStore([]);

describe('CategoryFilter component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render all category buttons correctly', () => {
    // Arrange
    const initialState = {
      threads: {
        categories: ['redux', 'perkenalan'],
        selectedCategory: '',
      },
    };
    const store = mockStore(initialState);

    // Action
    render(
        <Provider store={store}>
          <CategoryFilter />
        </Provider>,
    );

    // Assert
    expect(screen.getByText('Semua')).toBeInTheDocument();
    expect(screen.getByText('#redux')).toBeInTheDocument();
    expect(screen.getByText('#perkenalan')).toBeInTheDocument();
  });

  it('should mark the selected category button as active', () => {
    // Arrange
    const initialState = {
      threads: {
        categories: ['redux', 'perkenalan'],
        selectedCategory: 'redux',
      },
    };
    const store = mockStore(initialState);

    // Action
    render(
        <Provider store={store}>
          <CategoryFilter />
        </Provider>,
    );

    // Assert
    const reduxButton = screen.getByText('#redux');
    const allButton = screen.getByText('Semua');

    // Karena styled components, jadi gibberish dibawah ini, namun maksudnya adalah "aktif". Entah mengapa begitu?
    expect(reduxButton).toHaveClass('sc-fWnslK iGbUSF');
    expect(allButton).not.toHaveClass('sc-fWnslK iGbUSF');
  });

  it('should dispatch setSelectedCategory action when a category button is clicked', async () => {
    // Arrange
    const initialState = {
      threads: {
        categories: ['redux', 'perkenalan'],
        selectedCategory: '',
      },
    };
    const store = mockStore(initialState);
    store.dispatch = vi.fn();

    // Action
    render(
        <Provider store={store}>
          <CategoryFilter />
        </Provider>,
    );

    const reduxButton = screen.getByText('#redux');
    await userEvent.click(reduxButton);

    // Assert
    expect(store.dispatch).toHaveBeenCalledWith(setSelectedCategory('redux'));
  });

  it('should dispatch setSelectedCategory with empty string when "Semua" button is clicked', async () => {
    // Arrange
    const initialState = {
      threads: {
        categories: ['redux', 'perkenalan'],
        selectedCategory: 'redux',
      },
    };
    const store = mockStore(initialState);
    store.dispatch = vi.fn();

    // Action
    render(
        <Provider store={store}>
          <CategoryFilter />
        </Provider>,
    );

    const allButton = screen.getByText('Semua');
    await userEvent.click(allButton);

    // Assert
    expect(store.dispatch).toHaveBeenCalledWith(setSelectedCategory(''));
  });
});
