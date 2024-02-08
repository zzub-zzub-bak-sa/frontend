import React from 'react';
import { Image, Text, View } from 'react-native';
import styled from 'styled-components/native';
import CommonBottomSheet from '../../base/modal/CommonBottomSheet';
import { title3 } from '../../../styles/fonts';
import size from '../../../utils/size';
import Button from '../../base/Button';
import { WIDTH } from '../../../constants/constants';

const AddTagBottomSheet = ({ onPressClose, fromHomeScreen }) => {
  return (
    <CommonBottomSheet
      rightButtonType="close"
      onRightButtonPress={onPressClose}
      snapPoints={[size.height * 430]}
    >
      <TitleWrapper>
        <Title>저장 완료!</Title>
        <Title>먹킷링크가 더 채워졌어요.</Title>
      </TitleWrapper>
      <ImageBox>
        <FolderImage source={require('../../../assets/images/folders.png')} />
      </ImageBox>
      <ButtonWrapper>
        <Button
          width={WIDTH - 40}
          height={54}
          varient="filled"
          color="primary"
          text={fromHomeScreen ? '콘텐츠 보기' : '앱에서 보기'}
          onPress={onPressClose}
        />
      </ButtonWrapper>
    </CommonBottomSheet>
  );
};

export default AddTagBottomSheet;

const TitleWrapper = styled(View)`
  margin-bottom: ${size.height * 12}px;
  background-color: 'blue';
`;

const Title = styled(Text)`
  font-size: ${size.width * title3.semibold.fontSize}px;
  font-family: ${title3.semibold.fontFamily};
  color: white;
  text-align: center;
`;

const ImageBox = styled(View)`
  align-items: center;
  justify-content: center;
  padding: ${size.height * 45}px 0 0 0;
`;

const FolderImage = styled(Image)`
  width: ${size.width * 238}px;
  height: ${size.height * 127}px;
  overflow: visible;
`;

const ButtonWrapper = styled(View)`
  margin: ${size.height * 33}px ${size.width * 20}px;
`;
