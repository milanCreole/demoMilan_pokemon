import {View, Text} from 'react-native';
import {useGetPokemonsPaginatorQuery} from '../redux/services/pokemon';
import {useState} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, ScrollView} from 'react-native';
import PokemonsList from './Lists/PokemonList';
import {ActivityIndicator} from 'react-native-paper';
import {Button} from 'react-native-paper';
import {Colors} from '../Utils/Constants';
import React from 'react';

const getPaginationButtonOpacity = (isActive: boolean) => {
  if (!isActive) {
    return {opacity: 0};
  }
  return {};
};
const PaginationButtons = ({
  isPrevActive,
  isNextActive,
  page,
  incrementPage,
  decrementPage,
}: any) => {
  return (
    <View style={styles.buttonsContainer}>
      <Button
        style={{
          ...styles.paginationButton,
          ...getPaginationButtonOpacity(isPrevActive),
        }}
        onPress={decrementPage}
        disabled={!isPrevActive}
        textColor={Colors.primaryTextColor}
        contentStyle={{...styles.text}}>
        Previous
      </Button>

      <View style={styles.centererView}>
        <Text style={styles.text}>Page: {page}</Text>
      </View>
      <Button
        style={{
          ...styles.paginationButton,
          ...getPaginationButtonOpacity(isNextActive),
        }}
        onPress={incrementPage}
        disabled={!isNextActive}
        textColor={Colors.primaryTextColor}
        contentStyle={{...styles.text}}>
        <Text>Next</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  paginationButton: {
    width: '35%',
    backgroundColor: Colors.backGroundSurface,
  },

  centererView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {color: Colors.primaryTextColor, padding: 5},
});

export default PaginationButtons;
