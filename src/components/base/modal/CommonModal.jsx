import React from 'react';
import { Modal, View, Text } from 'react-native';
import styled from 'styled-components/native';
import Button from '../Button';
import { colors } from '../../../styles/colors';
import size from '../../../utils/size';
import { title3, body1 } from '../../../styles/fonts';
import IcClear from '../../../assets/icons/IcClear';

const CommonModal = ({ isVisible, title, message, buttons }) => {
  return (
    <Modal transparent visible={isVisible}>
      <ModalBackground>
        <ModalBox>
          <ModalHeader>
            <IcClear size={24} color="white" />
          </ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalMessage>{message}</ModalMessage>
          <ButtonsContainer>
            {buttons.map((button, index) => (
              <Button
                key={index}
                width={152}
                height={54}
                varient={button.varient}
                color={button.color}
                text={button.text}
                onPress={button.onPress}
              />
            ))}
          </ButtonsContainer>
        </ModalBox>
      </ModalBackground>
    </Modal>
  );
};

export default CommonModal;

const ModalBackground = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

const ModalBox = styled(View)`
  width: ${size.width * 350}px;
  height: ${size.height * 216}px;
  background-color: ${colors.bg[100]};
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  padding: ${size.width * 16}px;
  position: relative;
`;

const ModalHeader = styled(View)`
  width: 100%;
  padding-top: ${size.height * 20}px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const ModalTitle = styled(Text)`
  color: white;
  line-height: ${size.width * 19 * 1.4}px;
  font-family: ${title3.semibold.fontFamily};
  font-size: ${title3.semibold.fontSize}px;
  margin-bottom: ${size.height * 8}px;
`;

const ModalMessage = styled(Text)`
  color: ${colors.grey[300]};
  font-family: ${body1.medium.fontFamily};
  font-size: ${body1.medium.fontSize}px;
  text-align: center;
  margin-bottom: ${size.height * 30}px;
`;

const ButtonsContainer = styled(View)`
  flex-direction: row;
  gap: ${size.width * 14}px;
  margin-right: ${size.width * 16}px;
  margin-left: ${size.width * 16}px;
  margin-bottom: ${size.height * 16}px;
`;
