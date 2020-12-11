import React, {useState} from 'react';
import {
  TextInput,
  HelperText,
  Button,
  Checkbox,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import styled from 'styled-components';

export default function AddItem({addItem}) {
  const [text, setText] = useState('');
  const [checked, setChecked] = useState('unchecked');
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);

  const hasErrors = () => {
    return !(text.length > 4);
  };

  const handleCheck = () => {
    if (checked === 'checked') {
      setChecked('unchecked');
    } else {
      setChecked('checked');
    }
  };

  const handleSubmit = () => {
    if (text.length < 5) {
      setVisible(true);
    } else {
      const newItem = {task: text, important: checked === 'checked'};
      addItem(newItem);
    }
  };

  return (
    <ModalContainer>
      <ModalTitle>Add somthing you want to remember</ModalTitle>
      <InputContainer>
        <AddItemInput
          label="New simple task"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        {text.length > 0 && (
          <HelperTextRed type="error" visible={hasErrors()}>
            Task too short!
          </HelperTextRed>
        )}
      </InputContainer>
      <IsImportant
        label="Is it important?"
        status={checked}
        onPress={handleCheck}
      />
      <Button onPress={handleSubmit} mode="contained">
        Add
      </Button>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Hey!</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Did you forgot some letters?</Paragraph>
        </Dialog.Content>
      </Dialog>
    </ModalContainer>
  );
}

const HelperTextRed = styled(HelperText)`
  margin-top: 5px;
`;

const InputContainer = styled.View`
  margin-bottom: 30px;
`;

const IsImportant = styled(Checkbox.Item)`
  margin-bottom: 30px;
`;

const AddItemInput = styled(TextInput)`
  margin-top: 30px;
`;

const ModalContainer = styled.View`
  background-color: ${({theme}) => theme.colors.addItem};
  padding: 20px;
`;

const ModalTitle = styled.Text`
  color: ${({theme}) => theme.colors.font};
  font-size: 20px;
`;
