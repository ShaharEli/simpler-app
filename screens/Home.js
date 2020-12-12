import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Modal, Button} from 'react-native-paper';
import AddItem from '../components/AddItem';
import Task from '../components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
          <Task task={item} handleRemove={handleRemove} index={i} key={i} />
        ))}
      </ItemsList>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <AddItem addItem={addItem} />
      </Modal>
      {!visible && (
        <Button style={{marginTop: 30}} onPress={showModal}>
          Add Item
        </Button>
      )}
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
