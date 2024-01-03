import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../Utils/Constants';

interface cardProps {
  title: string;
  value: string;
}
const InfoCard = ({title, value}: cardProps) => {
  return (
    <View style={styles.item}>
      <View style={styles.rowContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  item: {
    marginTop: 5,
    paddingVertical: 2,
    backgroundColor: Colors.backGroundSurface,
    borderTopColor: Colors.gray,
    borderTopWidth: 1,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.primaryTextColor,
    paddingTop: 5,
  },
  value: {
    fontSize: 25,
    color: Colors.primaryTextColor,
    paddingTop: 5,
  },
});
