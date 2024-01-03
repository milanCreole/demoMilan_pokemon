import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {Colors} from '../../Utils/Constants';

const ErrorScreen = ({refetch, isFetching}: any) => {
  return (
    <View style={{...styles.centererView}}>
      <Text style={{padding: 20, color: Colors.primaryTextColor}}>
        Something went wrong ...
      </Text>
      <Button
        onPress={refetch}
        style={{...styles.button}}
        disabled={isFetching}
        loading={isFetching}
        mode={'contained-tonal'}
        textColor={Colors.primaryTextColor}>
        Refresh
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '35%',
    padding: 5,
  },
  centererView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backGround,
  },
});

export default ErrorScreen;
