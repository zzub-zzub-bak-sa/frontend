/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import CommonBottomSheet from '../../base/modal/CommonBottomSheet';
import { title3 } from '../../../styles/fonts';
import size from '../../../utils/size';
import Button from '../../base/Button';
import { WIDTH } from '../../../constants/constants';
import { dataByLinkState, tokenState } from '../../../store/store';
import { createPosts } from '../../../api/apis/posts';

const AddTagBottomSheet = ({ onPressClose, fromHomeScreen }) => {
  const dataByLink = useRecoilValue(dataByLinkState);
  const token = useRecoilValue(tokenState);
  const navigation = useNavigation();

  const { mutate } = useMutation(createPosts, {
    onSuccess: data => {
      console.log(data);
    },
  });

  useEffect(() => {
    mutate({ ...dataByLink, token });
  }, []);

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
          onPress={() => {
            navigation.navigate('Gallery', {
              id: dataByLink.folderId,
            });
            onPressClose();
          }}
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
  padding-top: ${size.height * 45}px;
`;

const FolderImage = styled(Image)`
  width: ${size.width * 238}px;
  height: ${size.height * 127}px;
  overflow: visible;
`;

const ButtonWrapper = styled(View)`
  margin: ${size.height * 33}px ${size.width * 20}px;
`;
