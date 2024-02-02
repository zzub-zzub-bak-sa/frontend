import React, { useRef, useState } from 'react';
import { Image, View } from 'react-native';
import CommonBottomSheet from '../base/modal/CommonBottomSheet';
import Button from '../base/Button';
import Card from '../base/Card';
import Folder from '../../assets/icons/Folder';
import Search from '../../assets/icons/Search';
import size from '../../utils/size';
import styled from 'styled-components';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const Default = () => {
  const bottomSheetRef = useRef(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const ref = useRef(null);

  return (
    <CommonBottomSheet
      ref={bottomSheetRef}
      snapPoints={['58%']}
      title="폴더 선택"
      leftButtonType="none"
      rightButtonType="close"
      onRightButtonPress={() => null}
    >
      <ButtonsContainer>
        <Button
          width={93}
          height={36}
          varient="filled"
          color="default"
          text="폴더추가"
          renderIcon={() => <Folder size={24} />}
          onPress={() => console.log('Add folder pressed')}
        />
        <TouchableOpacity onPress={() => console.log('Search Icon')}>
          <Search size={24} />
        </TouchableOpacity>
      </ButtonsContainer>
      {/* 폴더 목록 컨테이너 */}
      <FolderListContainer>
        <ScrollViewContainer>
          <FolderCard
            key="default-folder"
            title="기본폴더"
            numberOfLinks={0}
            onPress={() => console.log('Selected folder: 기본폴더')}
            isSelected
          />
          <FolderCard
            key="default-folder"
            title="기본폴더"
            numberOfLinks={0}
            onPress={() => console.log('Selected folder: 기본폴더')}
            isSelected
          />
          <FolderCard
            key="default-folder"
            title="기본폴더"
            numberOfLinks={0}
            onPress={() => console.log('Selected folder: 기본폴더')}
            isSelected
          />
        </ScrollViewContainer>
      </FolderListContainer>
      <ButtonContainer>
        <Button width={350} height={54} text="선택하기" varient="filled" color="primary" />
      </ButtonContainer>
    </CommonBottomSheet>
  );
};

export default Default;

const FolderListContainer = styled.View`
  flex: 1;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  margin: ${size.height * 4}px ${size.width * 20}px;
  align-items: center;
  gap: ${size.width * 16}px;
  margin-bottom: ${size.height * 16}px;
`;

const FolderCard = styled(Card)`
  margin-bottom: ${size.height * 10}px;
  border-radius: 8px;
`;

const ScrollViewContainer = styled(ScrollView)`
  flex: 1;
`;

const ButtonContainer = styled(View)`
  padding-left: ${size.width * 16}px;
  padding-bottom: ${size.height * 16}px;
`;
