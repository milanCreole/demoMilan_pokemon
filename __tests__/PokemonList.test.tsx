import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import PokemonsList from '../src/Components/Lists/PokemonList';
import {View} from 'react-native';

// Mock the necessary dependencies
jest.mock('../path-to-your-component/PokemonCard', () => 'MockedPokemonCard');

describe('PokemonsList', () => {
  it('renders PokemonsList with the provided data and pagination', async () => {
    const data = {
      results: [
        {name: 'Pikachu', url: 'https://example.com/pokemon/25/'},
        // Add more data as needed
      ],
    };
    const bottomPagination = <View testID="bottomPagination">Pagination</View>;
    const isFetching = false;
    const refetch = jest.fn();

    const {getByText, getByTestId} = render(
      <PokemonsList
        data={data}
        bottomPagination={bottomPagination}
        isFetching={isFetching}
        refetch={refetch}
      />,
    );

    // Check if the Pokemon names are rendered correctly
    expect(getByText('Pikachu')).toBeDefined();

    // Check if the bottomPagination component is rendered
    expect(getByTestId('bottomPagination')).toBeDefined();
  });

  it('calls refetch when refreshing the list', async () => {
    const data = {
      results: [
        {name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/'},
      ],
    };
    const bottomPagination = <View testID="bottomPagination">Pagination</View>;
    const isFetching = false;
    const refetch = jest.fn();

    const {getByTestId} = render(
      <PokemonsList
        data={data}
        bottomPagination={bottomPagination}
        isFetching={isFetching}
        refetch={refetch}
      />,
    );

    // Simulate the refresh event on the FlatList
    await waitFor(() => getByTestId('flatlist').props.onRefresh());

    // Check if the refetch function is called
    expect(refetch).toHaveBeenCalled();
  });
});
