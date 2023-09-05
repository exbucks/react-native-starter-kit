import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = () => {
  const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  const persistor = persistStore(store)
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};

export default configureStore;
