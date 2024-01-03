import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {pokemonApi} from './services/pokemon';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};

const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(pokemonApi.middleware),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
