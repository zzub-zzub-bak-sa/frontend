import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import CommonModal from '../base/modal/CommonModal';
import { colors } from '../../styles/colors';
import IcClose from '../../assets/icons/IcClose';
import size from '../../utils/size';
import { body1, title3 } from '../../styles/fonts';
import Button from '../base/Button';

const ContentDeleteModal = ({ show, onClose }) => {
  const navigation = useNavigation();

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
          <Title>정말 삭제하시겠어요?</Title>
          <SubTitle>삭제된 콘텐츠는 휴지통으로 이동해요.</SubTitle>
          <Buttons>
            <Button
              width={152}
              height={54}
              varient="filled"
              color="primary"
              text="취소하기"
              onPress={onClose}
            />
            <Button
              width={152}
              height={54}
              varient="filled"
              color="disable"
              text="삭제하기"
              onPress={() => {
                onClose();
                navigation.navigate('Gallery', {
                  showToast: true,
                  toastType: 'deleted',
                });
              }}
            />
          </Buttons>
        </Content>
      </View>
    </CommonModal>
  );
};

export default ContentDeleteModal;

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
