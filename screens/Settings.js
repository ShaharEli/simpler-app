import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';

export default function Settings() {
  return (
    <Container>
      <Text></Text>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;
