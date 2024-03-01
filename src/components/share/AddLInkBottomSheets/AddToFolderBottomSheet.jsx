import React from 'react';
import { Image, Text, View } from 'react-native';
import styled from 'styled-components/native';
import CommonBottomSheet from '../../base/modal/CommonBottomSheet';
import { title3 } from '../../../styles/fonts';
import size from '../../../utils/size';
import FolderBox from '../../base/FolderBox';
import Button from '../../base/Button';
import { WIDTH } from '../../../constants/constants';

const AddToFolderBottomSheet = ({ onPressClose, onPressGoTag, fromHomeScreen }) => {
  return (
    <CommonBottomSheet
      rightButtonType="close"
      onRightButtonPress={onPressClose}
      snapPoints={[size.height * 399]}
    >
      <TitleWrapper>
        <Title>폴더에 저장완료!</Title>
      </TitleWrapper>
      <ImageBox>
        <FolderBox>
          <FolderImage source={require('../../../assets/images/folder-yellow.png')} />
        </FolderBox>
      </ImageBox>
      {fromHomeScreen ? (
        <SingleButtonWrapper>
          <Button
            width={WIDTH - 30}
            height={54}
            varient="filled"
            color="primary"
            text="태그 추가"
            onPress={onPressGoTag}
          />
        </SingleButtonWrapper>
      ) : (
        <ButtonWrapper>
          <Button
            width={(WIDTH - 64) / 2}
            height={54}
            varient="filled"
            color="primary"
            text="태그 추가"
            onPress={onPressGoTag}
          />
          <Button
            width={(WIDTH - 64) / 2}
            height={54}
            varient="filled"
            color="default"
            text="앱에서 보기"
            onPress={onPressClose}
          />
        </ButtonWrapper>
      )}
    </CommonBottomSheet>
  );
};

export default AddToFolderBottomSheet;

const TitleWrapper = styled(View)`
  margin-bottom: ${size.height * 12}px;
  background-color: 'blue';
  margin-top: ${size.height * 20}px;
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
  margin-top: ${size.height * 15}px;
  margin-bottom: ${size.height * 31}px;
  padding-top: ${size.height * 45}px;
`;

const FolderImage = styled(Image)`
  width: ${size.width * 26.8}px;
  height: ${size.height * 29.2}px;
`;

const ButtonWrapper = styled(View)`
  flex-direction: row;
  gap: ${size.width * 8}px;
  padding: 0 ${size.height * 20}px;
  margin-left: ${size.width * 18}px;
`;

const SingleButtonWrapper = styled(View)`
  margin: ${size.height * 38}px ${size.width * 20}px;
`;
