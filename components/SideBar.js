import React, {useContext} from 'react';
import {ThemeContext} from '../helpers';
import styled from 'styled-components';
import {Switch} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

export default function SideBar() {
  const {currentTheme, setCurrentTheme} = useContext(ThemeContext);

  const onToggleTheme = async () => {
    try {
      switch (currentTheme) {
        case 'light':
          setCurrentTheme('dark');
          await AsyncStorage.setItem('theme', 'dark');
          break;
        case 'dark':
          setCurrentTheme('light');
          await AsyncStorage.setItem('theme', 'light');
          break;
      }
    } catch {}
  };

  const getToggleIconName = () => (currentTheme === 'dark' ? 'moon' : 'sun');

  const getToggleIconColor = () =>
    currentTheme === 'dark' ? 'blue' : 'yellow';

  return (
    <SideBarContainer>
      <ThemeToggle>
        <Switch value={currentTheme === 'dark'} onValueChange={onToggleTheme} />
        <Icon
          size={28}
          name={getToggleIconName()}
          color={getToggleIconColor()}
        />
      </ThemeToggle>
    </SideBarContainer>
  );
}

const SideBarContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.sideBar};
`;

const ThemeToggle = styled.View`
  flex-direction: row;
  align-self: center;
  width: 100px;
  justify-content: space-around;
`;
