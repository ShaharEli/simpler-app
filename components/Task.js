import React from 'react';
import {View, Text} from 'react-native';
import {Divider} from 'react-native-paper';
import styled from 'styled-components';

export default function Task({task}) {
  return (
    <>
      <TaskContainer>
        <TaskTitle>{task.task}</TaskTitle>
      </TaskContainer>
      <StyledDivider />
    </>
  );
}

const TaskContainer = styled.View`
  width: 100%;
  height: 80px;
  flex-direction: row;
  align-items: center;
`;

const StyledDivider = styled(Divider)`
  background-color: red;
`;

const TaskTitle = styled.Text`
  color: ${({theme}) => theme.colors.font};
`;
