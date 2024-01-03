import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {getPokemonIdFromURL} from '../../functions/generalFunctions';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../Utils/Constants';

const PokemonCard = ({item}: any) => {
  const navigation = useNavigation();

  const id = getPokemonIdFromURL(item.url);
  const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Card
      style={styles.item}
      onPress={() => navigation.navigate('Details', item)}>
      <View style={styles.rowContainer}>
        <FastImage
          style={{backgroundColor: 'transparent', height: 56, width: 56}}
          source={{uri: imageURL}}
        />

        <Text style={styles.title}>{item.name}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 12,
    backgroundColor: Colors.backGround,
    borderBottomWidth: 1,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 28,
    width: '60%',
    textAlign: 'center',
    color: Colors.primaryTextColor,
  },
});

export default PokemonCard;
