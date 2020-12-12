import React, {useContext} from 'react';
import {ThemeContext} from '../helpers';
import styled from 'styled-components';
import {Switch} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

export default function SideBar({navigation}) {
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

  const getLinkIconColor = () => (currentTheme === 'dark' ? 'white' : 'black');

  return (
    <SideBarContainer>
      <Settings onPress={() => navigation.navigate('Settings')}>
        <Icon size={28} name="settings" color={getLinkIconColor()} />
        <Link>Settings</Link>
      </Settings>
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

const Link = styled.Text`
  color: ${({theme}) => theme.colors.font};
  font-size: 23px;
  margin-left: 10px;
`;

const Settings = styled.TouchableOpacity`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 50px;
  background-color: ${({theme}) => theme.colors.task};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

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
