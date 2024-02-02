import React from 'react';
import { Modal, Pressable, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import size from '../../../utils/size';
import { HEIGHT, WIDTH } from '../../../constants/constants';

const CommonModal = ({
  showModal,
  onClose,
  children,
  width = 80,
  height = 20,
  bg = 'white',
  borderRadius = 10,
  style,
}) => {
  return (
    <ModalContainer
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={onClose}
    >
      <Blur onPress={onClose} />
      <ModalWrapper onPressOut={onClose} style={style}>
        <ModalContent width={width} height={height} bg={bg} borderRadius={borderRadius}>
          <View style={{ alignItems: 'center' }}>{children}</View>
        </ModalContent>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default CommonModal;

const ModalContainer = styled(Modal)`
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
`;

const ModalWrapper = styled(TouchableOpacity)`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 0;
  align-items: center;
  justify-content: center;
`;

const Blur = styled(Pressable)`
  flex: 1;
  background-color: '#000';
`;

const ModalContent = styled(View)`
  width: ${props => size.width * props.width}px;
  height: ${props => size.height * props.height}px;
  background-color: ${props => props.bg};
  justify-content: center;
  align-items: center;
  border-radius: ${({ borderRadius }) => borderRadius}px;
`;
