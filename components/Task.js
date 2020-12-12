import React from 'react';
import styled from 'styled-components';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Animated, StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

export default function Task({task, handleRemove, index}) {
  const renderRightActions = (progress, dragX) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });

    return (
      <StyledRectButton onPress={() => handleRemove(index)}>
        <Animated.View
          style={[
            {
              transform: [{translateX: trans}],
            },
          ]}>
          <Icon name="trash-2" size={35} color="red" />
        </Animated.View>
      </StyledRectButton>
    );
  };

  return (
    <Swipeable renderLeftActions={renderRightActions}>
      <TaskContainer important={task.important}>
        <TaskTitle important={task.important}>{task.task}</TaskTitle>
      </TaskContainer>
    </Swipeable>
  );
}

const TaskContainer = styled.View`
  width: 100%;
  min-height: 80px;
  flex-direction: row;
  align-items: center;
  background-color: ${({theme}) => theme.colors.task};
  padding: 10px;
  border-bottom-width: 1.5px;
  border-color: ${({theme, important}) =>
    important ? 'green' : theme.colors.divider};
  margin-bottom: 20px;
`;

const TaskTitle = styled.Text`
  color: ${({theme}) => theme.colors.font};
  font-size: ${({important}) => (important ? '20px' : '18px')};
  font-weight: ${({important}) => (important ? 'bold' : 'normal')};
`;

const StyledRectButton = styled(RectButton)`
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
