import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  View,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import {useGetPokemonsByIdQuery} from '../redux/services/pokemon';
import {getPokemonIdFromURL} from '../functions/generalFunctions';

import ErrorScreen from './CommonScreens/ErrorScreen';
import LoadingScreen from './CommonScreens/LoadingScreen';

import {Colors} from '../Utils/Constants';
import InfoCard from '../Components/Cards/InfoCard';

const getTypes = (data: any) => {
  const types = data.types;
  const typesStrings = [];
  for (const key in types) {
    typesStrings.push(` ${types[key].type.name}`);
  }

  if (typesStrings.length == 0) {
    return 'No type';
  }

  return typesStrings.toString();
};

const DisplayDetailsScreen = ({data}: any) => {
  let ScreenWidth = Dimensions.get('window').width;
  const id = data.id;
  const name = data.name;
  const height = data.height;

  const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={{...styles.h1}}>{name}</Text>
      </View>
      <ScrollView>
        <View style={{...styles.container}}>
          <View style={styles.imgContainer}>
            <FastImage
              style={{
                ...styles.mainImage,
                width: ScreenWidth - 200,
                height: ScreenWidth - 200,
              }}
              source={{
                uri: imageURL,
              }}
              resizeMode={'contain'}
            />
          </View>

          <View>
            {InfoCard({title: 'Name', value: name})}
            {InfoCard({title: 'Height', value: `${height || '0'} cm`})}
            {InfoCard({title: 'Weight', value: `${data.weight || ''} kg`})}
            {InfoCard({title: 'Types', value: getTypes(data)})}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailsScreen = ({route}: any) => {
  const {url} = route.params;
  const id = getPokemonIdFromURL(url);

  const {data, error, isFetching, refetch, isLoading} =
    useGetPokemonsByIdQuery(id);

  let toRender = error ? (
    <ErrorScreen refetch={refetch} isFetching={isFetching} />
  ) : isLoading ? (
    <LoadingScreen />
  ) : data ? (
    <DisplayDetailsScreen data={data} />
  ) : null;

  return toRender;
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: Colors.white},
  container: {backgroundColor: Colors.backGround},
  header: {backgroundColor: Colors.blue},
  h1: {
    marginVertical: 17,
    fontWeight: 'bold',
    fontSize: 45,
    color: Colors.white,
    paddingHorizontal: 10,
  },
  imgContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },

  mainImage: {
    backgroundColor: Colors.backGroundSurface,
  },
});

export default DetailsScreen;
