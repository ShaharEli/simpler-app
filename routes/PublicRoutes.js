import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import SideBar from '../components/SideBar';
import Home from '../screens/Home';
import {ThemeContext} from '../helpers';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const getHeaderStyle = (currentTheme) => ({
  headerStyle: {
    backgroundColor: currentTheme === 'dark' ? '#242526' : '#FFFFFF',
  },
  headerTitleStyle: {
    color: currentTheme === 'dark' ? '#FFFFFF' : 'black',
  },
});

export default function PublicRoutes() {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <SideBar {...props} />}>
      <Drawer.Screen name="stack" component={MainStack} />
    </Drawer.Navigator>
  );
}

const MainStack = () => {
  const {currentTheme} = useContext(ThemeContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation}) => ({
          title: 'Home',
          ...getHeaderStyle(currentTheme),
          headerRight: () => (
            <Hamburger navigation={navigation} theme={currentTheme} />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const Hamburger = (
  {navigation, theme}, //hamburger icon drawer toggler
) => (
  <Icon
    name="navicon"
    style={{
      marginRight: 10,
      color: theme === 'dark' ? 'white' : 'black',
    }}
    size={30}
    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
  />
);
