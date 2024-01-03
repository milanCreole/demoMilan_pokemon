import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import PokemonCard from '../src/Components/Cards/PokemonCard';

// Mock the necessary dependencies
jest.mock('react-native-fast-image', () => 'FastImage');

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({navigate: jest.fn()})),
}));

describe('PokemonCard', () => {
  it('renders PokemonCard with the provided item data', () => {
    const item = {
      name: 'Pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    };

    const {getByText, getByTestId} = render(<PokemonCard item={item} />);

    // Check if the Pokemon name is rendered correctly
    expect(getByText('Pikachu')).toBeDefined();
  });

  it('navigates to Details screen on press', () => {
    const item = {
      name: 'Pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    };

    const {getByTestId} = render(<PokemonCard item={item} />);

    // Simulate press event on the Card component
    fireEvent.press(getByTestId('pokemonCard'));

    // Check if the navigation function is called with the correct arguments
    expect(useNavigation().navigate).toHaveBeenCalledWith('Details', item);
  });
});
