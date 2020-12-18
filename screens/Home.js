import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {Modal, Button, Snackbar} from 'react-native-paper';
import AddItem from '../components/AddItem';
import Task from '../components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NotificationsContext, getTimestamp} from '../helpers';
import PushNotification from 'react-native-push-notification';

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [snackbarShown, setSnackbarShown] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const {notificationsConfig} = useContext(NotificationsContext);
  useEffect(() => {
    (async () => {
      try {
        const previousItems = await AsyncStorage.getItem('tasks');
        if (previousItems) {
          setItems(JSON.parse(previousItems));
        }
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addItem = async (item) => {
    setItems((prev) => [item, ...prev]);
    setVisible(false);
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify([item, ...items]));
    } catch {}
  };

  useEffect(() => {
    PushNotification.cancelAllLocalNotifications();
    if (items.length > 0) {
      const dates = getTimestamp(
        notificationsConfig.notifyHour,
        notificationsConfig.days,
      );
      let important = 0;
      for (let item of items) {
        if (item.important) {
          important++;
        }
      }
      const importantMsg = important
        ? `and ${important} of them ${important > 1 && 'are '}kind of important`
        : '';
      for (let date of dates) {
        if (date.valueOf() > new Date().valueOf()) {
          PushNotification.localNotificationSchedule({
            channelId: 'channel-id',
            title: 'Simple notification',
            message: `You got ${items.length} simple tasks left ${importantMsg}`, // (required)
            date: date,
          });
        }
      }
    }
  }, [items, notificationsConfig]);

  const handleRemove = async (index) => {
    const previousItems = items.slice();
    previousItems.splice(index, 1);
    setItems(previousItems);
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(previousItems));
    } catch {}
  };

  return (
    <HomeContainer>
      <Title>Simple Tasks</Title>
      <ItemsList>
        {!loading && items.length === 0 && (
          <NewUserText>No Task Here...</NewUserText>
        )}
        {items.map((item, i) => (
          <Task
            task={item}
            setSnackbarShown={setSnackbarShown}
            handleRemove={handleRemove}
            index={i}
            key={i}
          />
        ))}
      </ItemsList>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <AddItem addItem={addItem} />
      </Modal>
      {!visible && (
        <Button style={{marginTop: 30, marginBottom: 40}} onPress={showModal}>
          Add Task
        </Button>
      )}
      <Snackbar
        visible={snackbarShown}
        duration={1800}
        style={{backgroundColor: 'grey'}}
        onDismiss={() => setSnackbarShown(false)}>
        Simple task copied to your clipboard
      </Snackbar>
    </HomeContainer>
  );
}

const ItemsList = styled.ScrollView`
  height: 100%;
  padding: 10px;
`;

const NewUserText = styled.Text`
  color: ${({theme}) => theme.colors.font};
  font-size: 24px;
`;

const Title = styled.Text`
  color: ${({theme}) => theme.colors.font};
  font-weight: bold;
  font-size: 50px;
  margin: 8px;
`;

const HomeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

const containerStyle = {margin: 20};
