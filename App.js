import React from 'react';

import {ThemeProvider} from 'react-native-elements';

import {Provider} from 'react-redux';
import Store from './redux/Store';

// Screens
import AvailableBluetoothDevices from './Screens/AvailableBluetoothDevices';
import Home from './Screens/Home';
import Aoa from './Screens/Aoa';

// A module to keep the screen awake
import KeepAwake from 'react-native-keep-awake';

import 'react-native-gesture-handler';

// A module for screen navigation
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// The stack of screens
const Stack = createStackNavigator();

// Activiting the keep-awake module
KeepAwake.activate();

const App = () => {
  return (
    // Setting up the redux store and the screens
    <Provider store={Store}>
      <ThemeProvider useDark={true}>
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AoA" component={Aoa} />
            <Stack.Screen
              name="List"
              options={{title: 'Connect to a Bluetooth device'}}
              component={AvailableBluetoothDevices}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
