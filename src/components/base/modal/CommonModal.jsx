import React from 'react';
import { Modal, Pressable, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import Button from '../Button';
import { colors } from '../../../styles/colors';
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
  isOnCenter = false,
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
        <ModalContent
          width={width}
          height={height}
          bg={bg}
          borderRadius={borderRadius}
          isOnCenter={isOnCenter}
        >
          <CenterView>{children}</CenterView>
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
  background-color: black;
  opacity: 0.8;
`;

const ModalContent = styled(View)`
  width: ${props => size.width * props.width}px;
  height: ${props => size.height * props.height}px;
  background-color: ${props => props.bg};
  justify-content: ${({ isOnCenter }) => (isOnCenter ? 'center' : 'none')};
  align-items: ${({ isOnCenter }) => (isOnCenter ? 'center' : 'none')};
  border-radius: ${({ borderRadius }) => borderRadius}px;
`;

const CenterView = styled(View)`
  align-items: ${({ isOnCenter }) => (isOnCenter ? 'center' : 'none')};
`;
