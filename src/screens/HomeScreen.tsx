import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {useGetPokemonsPaginatorQuery} from '../redux/services/pokemon';
import PaginationButtons from '../Components/PaginationButtons';
import LoadingScreen from './CommonScreens/LoadingScreen';
import ErrorScreen from './CommonScreens/ErrorScreen';
import PokemonsList from '../Components/Lists/PokemonList';
import {Colors} from '../Utils/Constants';
import {pokemonList} from '../types/pokemonListModel';

const DisplayPokemonList = ({
  data,
  page,
  isPrevActive,
  isNextActive,
  incrementPage,
  decrementPage,
  isFetching,
  refetch,
}: pokemonList) => {
  const bottomPagination = (
    <PaginationButtons
      isPrevActive={isPrevActive}
      isNextActive={isNextActive}
      page={page}
      incrementPage={incrementPage}
      decrementPage={decrementPage}
    />
  );

  return (
    <PokemonsList
      data={data}
      isFetching={isFetching}
      refetch={refetch}
      bottomPagination={bottomPagination}
    />
  );
};

const HomeScreen = () => {
  const [page, setPage] = useState(1);

  const {data, error, isFetching, refetch, isLoading} =
    useGetPokemonsPaginatorQuery(page);

  const incrementPage = () => {
    setPage(page + 1);
  };
  const decrementPage = () => {
    setPage(page - 1);
  };

  let isNextActive = false;
  let isPrevActive = false;

  if (!error) {
    if (!isFetching) {
      if (data.next != null) {
        isNextActive = true;
      }
      if (data.previous != null) {
        isPrevActive = true;
      }
    }
  }

  if (error) {
    return <ErrorScreen refetch={refetch} isFetching={isFetching} />;
  }

  if (isLoading) {
    <LoadingScreen />;
  }
  return (
    <SafeAreaView style={styles.container}>
      {data ? (
        <DisplayPokemonList
          page={page}
          isPrevActive={isPrevActive}
          isNextActive={isNextActive}
          incrementPage={incrementPage}
          decrementPage={decrementPage}
          data={data}
          isFetching={isFetching}
          refetch={refetch}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backGround,
  },
  buttonsContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  button: {
    width: '35%',
    padding: 5,
  },
  centererView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default HomeScreen;
