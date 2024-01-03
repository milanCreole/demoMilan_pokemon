import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect'; // for extended matchers
import {useGetPokemonsPaginatorQuery} from '../src/redux/services/pokemon';
import HomeScreen from '../src/screens/HomeScreen';

jest.mock('../src/redux/services/pokemon');

describe('HomeScreen', () => {
  it('renders loading screen when data is loading', async () => {
    // Mock the useGetPokemonsPaginatorQuery hook to return loading state
    (useGetPokemonsPaginatorQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isFetching: true,
      refetch: jest.fn(),
      isLoading: true,
    });

    const {getByTestId} = render(<HomeScreen />);

    // Wait for loading screen to appear
    await waitFor(() => {
      expect(getByTestId('loading-screen')).toBeDefined();
    });
  });

  it('renders error screen when there is an error', async () => {
    // Mock the useGetPokemonsPaginatorQuery hook to return an error
    (useGetPokemonsPaginatorQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: new Error('Test error'),
      isFetching: false,
      refetch: jest.fn(),
      isLoading: false,
    });

    const {getByTestId} = render(<HomeScreen />);

    // Wait for error screen to appear
    await waitFor(() => {
      expect(getByTestId('error-screen')).toBeDefined();
    });
  });

  it('renders the list of pokemons when data is available', async () => {
    // Mock the useGetPokemonsPaginatorQuery hook to return mock data
    const mockData = {
      results: [
        {name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/'},
      ],
      next: null,
      previous: null,
    };

    (useGetPokemonsPaginatorQuery as jest.Mock).mockReturnValue({
      data: mockData,
      error: undefined,
      isFetching: false,
      refetch: jest.fn(),
      isLoading: false,
    });

    const {getByText} = render(<HomeScreen />);

    // Wait for the Pokemon name to appear
    await waitFor(() => {
      expect(getByText('Pikachu')).toBeDefined();
    });
  });
});
