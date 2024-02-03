import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import styled from 'styled-components/native';
import CommonBottomSheet from '../base/modal/CommonBottomSheet';
import size from '../../utils/size';
import Button from '../base/Button';
import InputField from '../base/InputField';

const AddLinkBottomSheet = ({ onPressClose, onNext }) => {
  const [inputValue, setInputValue] = useState('');

  const customContainerStyle = {
    marginLeft: size.width * 20,
    marginRight: size.width * 20,
    marginTop: size.height * 16,
    marginBottom: size.height * 16,
  };

  return (
    <CommonBottomSheet snapPoints={['40%']} title="링크 추가하기" rightButtonType="close">
      <InputField
        placeholder="링크를 입력하세요"
        value={inputValue}
        containerStyle={customContainerStyle}
      />
      <ButtonContainer>
        <Button
          width={350}
          height={54}
          varient="filled"
          color="primary"
          text="다음"
          onPress={onNext}
        />
      </ButtonContainer>
    </CommonBottomSheet>
  );
};

export default AddLinkBottomSheet;

const ButtonContainer = styled(View)`
  margin-top: ${size.height * 17}px;
  margin-left: ${size.width * 20}px;
`;
