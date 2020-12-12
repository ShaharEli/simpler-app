/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  //   requestPermissions: true,
  requestPermissions: Platform.OS === 'ios',
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
});
PushNotification.createChannel({
  channelId: 'channel-id', // (required)
  channelName: 'My channel', // (required)
  channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
  soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
  importance: 4, // (optional) default: 4. Int value of the Android notification importance
  vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
});

AppRegistry.registerComponent(appName, () => App);
