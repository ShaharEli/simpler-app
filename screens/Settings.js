import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import {RNNumberSelector} from 'react-native-number-selector';
import {NotificationsContext, arrOfdays, arrOfhours} from '../helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View} from 'react-native';

export default function Settings() {
  const {notificationsConfig, setNotificationsConfig} = useContext(
    NotificationsContext,
  );

  const [currentTimestamp] = useState(Number(notificationsConfig.notifyHour));

  const [selectedDays] = useState(Number(notificationsConfig.days));

  const handleDaysChange = async (number) => {
    const previousNotificationsConfig = JSON.parse(
      JSON.stringify(notificationsConfig),
    );
    const newNotificationsConfig = {
      ...previousNotificationsConfig,
      days: number,
    };
    setNotificationsConfig(newNotificationsConfig);
    try {
      await AsyncStorage.setItem(
        'notificationsConfig',
        JSON.stringify(newNotificationsConfig),
      );
    } catch {}
  };

  const handleTimestampChange = async (number) => {
    const previousNotificationsConfig = JSON.parse(
      JSON.stringify(notificationsConfig),
    );
    const newNotificationsConfig = {
      ...previousNotificationsConfig,
      notifyHour: number,
    };
    setNotificationsConfig(newNotificationsConfig);
    try {
      await AsyncStorage.setItem(
        'notificationsConfig',
        JSON.stringify(newNotificationsConfig),
      );
    } catch {}
  };

  return (
    <Container>
      <Title>Simple Settings</Title>
      <View>
        <ChooserTitle>Choose notifications frequency (by days)</ChooserTitle>
        <RNNumberSelector
          style={{left: 0, width: '100%', height: 80}}
          items={arrOfdays}
          selectedItem={selectedDays}
          spacing={50}
          highlightedFontSize={45}
          fontSize={30}
          textColor={'grey'}
          highlightedTextColor="#fcc80c"
          viewAnimation={0}
          onChange={handleDaysChange}
        />
      </View>
      <View>
        <ChooserTitle>Choose notifications hour</ChooserTitle>
        <RNNumberSelector
          style={{left: 0, width: '100%', height: 80}}
          items={arrOfhours}
          selectedItem={currentTimestamp}
          spacing={50}
          highlightedFontSize={45}
          fontSize={30}
          textColor={'grey'}
          highlightedTextColor="#fcc80c"
          viewAnimation={0}
          onChange={handleTimestampChange}
        />
      </View>
      <View></View>
    </Container>
  );
}
const ChooserTitle = styled.Text`
  color: ${({theme}) => theme.colors.font};
  margin: 20px;
  font-size: 30px;
`;
const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.background};
`;

const Title = styled.Text`
  color: ${({theme}) => theme.colors.font};
  font-weight: bold;
  font-size: 50px;
  margin: 8px;
`;
