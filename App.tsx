import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';

import Router from './src/Router/Router';
import store, {persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
