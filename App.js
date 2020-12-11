/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {ThemeProvider} from 'styled-components';
import {theme, ThemeContext} from './helpers';
import PublicRoutes from './routes/PublicRoutes';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-native-paper';

const App = () => {
  const [currentTheme, setCurrentTheme] = useState('light');
  useEffect(() => {
    (async () => {
      try {
        const previousTheme = await AsyncStorage.getItem('theme');
        if (previousTheme === 'dark') {
          setCurrentTheme('dark');
        }
      } catch (err) {}
    })();
  }, []);

  return (
    <Provider>
      <ThemeContext.Provider value={{currentTheme, setCurrentTheme}}>
        <ThemeProvider theme={() => theme(currentTheme)}>
          <NavigationContainer>
            <PublicRoutes />
          </NavigationContainer>
        </ThemeProvider>
      </ThemeContext.Provider>
    </Provider>
  );
};

export default App;
