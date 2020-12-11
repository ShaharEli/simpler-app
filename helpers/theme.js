import {lightTheme, darkTheme} from './themes';

export const theme = (currentTheme) => {
  switch (currentTheme) {
    case 'light':
      return lightTheme;
    case 'dark':
      return darkTheme;
  }
};
