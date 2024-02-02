import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';
import CommonBottomSheet from '../../base/modal/CommonBottomSheet';
import InputField from '../../base/InputField';
import Button from '../../base/Button';
import { colors } from '../../../styles/colors';
import size from '../../../utils/size';

const SearchFolder = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <CommonBottomSheet
      snapPoints={['70%', '90%']}
      title="새로운 폴더"
      leftButtonType="back"
      rightButtonType="done"
    >
      <CreateContainer>
        <ImageBox>
          <FolderImage source={require('../../../assets/images/editFolder.png')} />
        </ImageBox>
        <InputContainer>
          <InputField
            placeholder="태그를 입력하세요"
            value={inputValue}
            onChangeValue={setInputValue}
          />
        </InputContainer>
      </CreateContainer>
      <ButtonContainer>
        <Button width={350} height={54} text="선택하기" varient="filled" color="primary" />
      </ButtonContainer>
    </CommonBottomSheet>
  );
};

export default SearchFolder;

const CreateContainer = styled(View)`
  flex: 1;
`;

const ButtonContainer = styled(View)`
  border-radius: 12px;
  margin: ${size.height * 32}px ${size.width * 20}px ${size.height * 20}px ${size.width * 20}px;
  background-color: ${colors.grey[100]};
`;

const ImageBox = styled(View)`
  align-items: center;
  justify-content: center;
  padding: ${size.height * 45}px 0;
`;

const InputContainer = styled(View)`
  margin: ${size.height * 16}px ${size.width * 23}px;
`;

const FolderImage = styled(Image)`
  width: ${size.width * 100}px;
  height: ${size.height * 100}px;
  overflow: visible;
`;
