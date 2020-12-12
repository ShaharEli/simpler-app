/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {ThemeProvider} from 'styled-components';
import {theme, ThemeContext, NotificationsContext} from './helpers';
import PublicRoutes from './routes/PublicRoutes';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-native-paper';

const App = () => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [notificationsConfig, setNotificationsConfig] = useState({
    days: 1,
    notifyHour: 20,
  });

  useEffect(() => {
    (async () => {
      try {
        const previousTheme = await AsyncStorage.getItem('theme');
        if (previousTheme === 'light') {
          setCurrentTheme('light');
        }
        const previousNotificationsConfig = await AsyncStorage.getItem(
          'notificationsConfig',
        );
        if (previousNotificationsConfig) {
          setNotificationsConfig(JSON.parse(previousNotificationsConfig));
        }
      } catch (err) {}
    })();
  }, []);

  return (
    <Provider>
      <ThemeContext.Provider value={{currentTheme, setCurrentTheme}}>
        <NotificationsContext.Provider
          value={{notificationsConfig, setNotificationsConfig}}>
          <ThemeProvider theme={() => theme(currentTheme)}>
            <NavigationContainer>
              <PublicRoutes />
            </NavigationContainer>
          </ThemeProvider>
        </NotificationsContext.Provider>
      </ThemeContext.Provider>
    </Provider>
  );
};

export default App;
