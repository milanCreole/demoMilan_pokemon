import React from 'react';
import {StyleSheet, StatusBar, FlatList, View} from 'react-native';
import PokemonCard from '../Cards/PokemonCard';
import {Text} from 'react-native-paper';
import {Colors} from '../../Utils/Constants';
import {pokemonListModel} from '../../types/pokemonListModel';

interface pokemonListProps {
  data: {results: [pokemonListModel]};
  bottomPagination: any;
  isFetching: boolean;
  refetch: any;
}
const PokemonsList = ({
  data,
  bottomPagination,
  isFetching,
  refetch,
}: pokemonListProps) => {
  const renderItem = ({item}: any) => (
    <PokemonCard item={item} key={item.name} />
  );

  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: Colors.blue}}>
        <Text style={{...styles.h1}}>PokeReact</Text>
      </View>
      <FlatList
        data={data.results}
        renderItem={renderItem}
        keyExtractor={pokemon => pokemon.name}
        ListFooterComponent={bottomPagination}
        refreshing={isFetching}
        onRefresh={refetch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  h1: {
    marginVertical: 17,
    fontWeight: 'bold',
    fontSize: 45,
    color: Colors.white,
    paddingHorizontal: 10,
  },
});

export default PokemonsList;
