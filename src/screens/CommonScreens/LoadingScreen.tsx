import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Colors} from '../../Utils/Constants';

const LoadingScreen = () => {
  return (
    <View style={{...styles.centererView}}>
      <ActivityIndicator size="large" testID="isLoading" />
    </View>
  );
};

const styles = StyleSheet.create({
  centererView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backGround,
  },
});
export default LoadingScreen;
