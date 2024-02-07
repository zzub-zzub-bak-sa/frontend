import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import CommonModal from '../base/modal/CommonModal';
import { colors } from '../../styles/colors';
import IcClose from '../../assets/icons/IcClose';
import size from '../../utils/size';
import { body1, title3 } from '../../styles/fonts';
import Button from '../base/Button';

const CancelOrNotModal = ({ show, onClose, onStop }) => {
  return (
    <CommonModal
      width={350}
      height={236}
      borderRadius={size.height * 24}
      showModal={show}
      onClose={onClose}
      bg={colors.bg[100]}
      isOnCenter={false}
    >
      <View>
        <Header>
          <TouchableOpacity onPress={onClose}>
            <IcClose />
          </TouchableOpacity>
        </Header>
        <Content>
          <Title>콘텐츠 이동을 종료하시겠어요?</Title>
          <SubTitle>변경사항이 사라져요. ㅠㅠ</SubTitle>
          <Buttons>
            <Button
              width={152}
              height={54}
              varient="filled"
              color="primary"
              text="계속하기"
              onPress={onClose}
            />
            <Button
              width={152}
              height={54}
              varient="filled"
              color="disable"
              text="종료하기"
              onPress={() => {
                onClose();
                onStop();
              }}
            />
          </Buttons>
        </Content>
      </View>
    </CommonModal>
  );
};

export default CancelOrNotModal;

const Header = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: ${size.width * 20}px;
  padding-top: ${size.height * 20}px;
  margin-bottom: ${size.height * 11}px;
`;

const Title = styled(Text)`
  font-family: ${title3.semibold.fontFamily};
  font-size: ${title3.semibold.fontSize}px;
  color: white;
  margin-bottom: ${size.height * 8}px;
`;

const Content = styled(View)`
  justify-content: center;
  align-items: center;
`;

const SubTitle = styled(Text)`
  font-family: ${body1.medium.fontFamily};
  font-size: ${body1.medium.fontSize}px;
  color: ${colors.grey[300]};
  margin-bottom: ${size.height * 30}px;
`;

const Buttons = styled(View)`
  padding: 0 ${size.width * 16}px;
  flex-direction: row;
  gap: ${size.width * 14}px;
`;
