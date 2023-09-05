import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import configureStore from './store';

import HomeScreen from './containers/home'
import LoginScreen from './containers/login'
import RegisterScreen from './containers/register'

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: {userId: string, sort: 'latest' | 'top'};
}

const RootStack = createNativeStackNavigator<RootStackParamList>();
const { store, persistor } = configureStore()

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootStack.Navigator initialRouteName="Login">
            <RootStack.Screen name="Home" component={HomeScreen} initialParams={{ userId: '0', sort: 'latest' }} />
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Register" component={RegisterScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
