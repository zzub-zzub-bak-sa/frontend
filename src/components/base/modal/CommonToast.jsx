import React from 'react';
import styled from 'styled-components/native';
import { Text, View, TouchableOpacity } from 'react-native';
import size from '../../../utils/size';
import { colors } from '../../../styles/colors';
import { subtitle3, body2 } from '../../../styles/fonts';

const CommonToast = ({ message, rightButton, buttonTitle }) => {
  return (
    <ToastContainer>
      <MessageText>{message}</MessageText>
      <ButtonContainer onPress={rightButton.onPress}>
        <ButtonText>{buttonTitle}</ButtonText>
      </ButtonContainer>
    </ToastContainer>
  );
};

export default CommonToast;

const ToastContainer = styled(View)`
  background-color: ${colors.grey[200]};
  padding: ${size.height * 10}px ${size.width * 16}px;
  width: ${size.width * 350}px;
  height: ${size.height * 56}px;
  z-index: 10;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: center;
`;

const MessageText = styled(Text)`
  color: white;
  font-family: ${subtitle3.bold.fontFamily};
  font-size: ${subtitle3.bold.fontSize};
  flex: 1;
  margin-right: ${size.width * 20}px;
`;

const ButtonContainer = styled(TouchableOpacity)`
  background-color: transparent;
  position: absolute;
  right: ${size.width * 20}px; // 오른쪽에서 20px 떨어진 곳
`;

const ButtonText = styled(Text)`
  color: white; // 버튼 텍스트 색상
  font-family: ${body2.medium.fontFamily};
  font-size: ${body2.medium.fontSize};
`;
