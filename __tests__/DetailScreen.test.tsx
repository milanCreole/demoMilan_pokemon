import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect'; // for extended matchers
import DetailsScreen from '../src/screens/DetailsScreen';
import {useGetPokemonsByIdQuery} from '../src/redux/services/pokemon';

// Mock the useGetPokemonsByIdQuery hook
jest.mock('../src/redux/services/pokemon', () => ({
  __esModule: true,
  ...jest.requireActual('../src/redux/services/pokemon'),
  useGetPokemonsByIdQuery: jest.fn(),
}));

describe('DetailsScreen', () => {
  it('renders details screen with data', async () => {
    // Mock the useGetPokemonsByIdQuery hook to return mock data
    const mockData = {
      id: 1,
      name: 'Pikachu',
      height: 40,
      weight: 6,
      types: [{type: {name: 'electric'}}, {type: {name: 'flying'}}],
    };

    (useGetPokemonsByIdQuery as jest.Mock).mockReturnValue({
      data: mockData,
      error: undefined,
      isFetching: false,
      refetch: jest.fn(),
      isLoading: false,
    });

    const {getByText, getByTestId} = render(
      <DetailsScreen
        route={{params: {url: 'https://example.com/pokemon/1/'}}}
      />,
    );

    // Wait for the asynchronous rendering of the DetailsScreen
    await waitFor(() => {
      // Perform assertions based on the expected data
      expect(getByText('Pikachu')).toBeDefined();
      expect(getByText('Height')).toBeDefined();
      expect(getByText('40 cm')).toBeDefined();
    });
  });

  it('renders error screen when there is an error', async () => {
    // Mock the useGetPokemonsByIdQuery hook to return an error
    (useGetPokemonsByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: new Error('Test error'),
      isFetching: false,
      refetch: jest.fn(),
      isLoading: false,
    });

    const {getByText} = render(
      <DetailsScreen
        route={{params: {url: 'https://example.com/pokemon/1/'}}}
      />,
    );

    // Wait for the error screen to appear
    await waitFor(() => {
      expect(getByText('Error Screen')).toBeDefined(); // Adjust this based on your error screen content
    });
  });

  it('renders loading screen while fetching data', async () => {
    // Mock the useGetPokemonsByIdQuery hook to simulate loading
    (useGetPokemonsByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isFetching: true,
      refetch: jest.fn(),
      isLoading: true,
    });

    const {getByText} = render(
      <DetailsScreen
        route={{params: {url: 'https://example.com/pokemon/1/'}}}
      />,
    );

    // Wait for the loading screen to appear
    await waitFor(() => {
      expect(getByText('Loading...')).toBeDefined(); // Adjust this based on your loading screen content
    });
  });
});
