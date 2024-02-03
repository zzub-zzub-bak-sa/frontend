import React, { useState } from 'react';
import { Keyboard, View } from 'react-native';
import styled from 'styled-components/native';
import CommonBottomSheet from '../base/modal/CommonBottomSheet';
import size from '../../utils/size';
import InputField from '../base/InputField';
import { colors } from '../../styles/colors';
import { WIDTH } from '../../constants/constants';
import Button from '../base/Button';

const EditNicknameBottomSheet = ({ onPressClose, value, onChangeText }) => {
  const [keyboard, setShowKeyboard] = useState(false);

  const handleInputFocus = () => {
    setShowKeyboard(true);
    function onKeyboardDidShow(e) {
      setShowKeyboard(true);
    }

    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    return () => {
      showSubscription.remove();
    };
  };

  return (
    <CommonBottomSheet
      title="닉네임 편집"
      rightButtonType="close"
      onRightButtonPress={onPressClose}
      snapPoints={[keyboard ? size.height * 640 : size.height * 355, '105.7%']}
    >
      <InputWrapper>
        <InputField
          placeholder="닉네임을 작성해 주세요."
          placeholderTextColor={colors.grey[200]}
          value={value}
          onChangeValue={onChangeText}
          maxLength={16}
          onFocus={() => handleInputFocus()}
        />
        <Space />
      </InputWrapper>
      <ButtonWrapper>
        <Button text="다음" varient="filled" color="primary" height={54} />
      </ButtonWrapper>
    </CommonBottomSheet>
  );
};

export default EditNicknameBottomSheet;

const InputWrapper = styled(View)`
  margin: ${size.height * 41}px ${size.width * 32}px;
  border-bottom-color: ${colors.orange};
  border-bottom-width: 1px;
`;

const Space = styled(View)`
  height: ${size.height * 16}px;
`;

const ButtonWrapper = styled(View)`
  align-items: center;
`;
