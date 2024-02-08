import React, { useState } from 'react';
import { Keyboard, View } from 'react-native';
import styled from 'styled-components/native';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import CommonBottomSheet from '../base/modal/CommonBottomSheet';
import size from '../../utils/size';
import Button from '../base/Button';
import InputField from '../base/InputField';
import { colors } from '../../styles/colors';
import { HEIGHT, WIDTH } from '../../constants/constants';
import { dataByLinkState } from '../../store/store';

const AddLinkBottomSheet = ({ onPress, onNext }) => {
  const [dataByLink, setDataByLink] = useRecoilState(dataByLinkState);
  const [inputValue, setInputValue] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);

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

  const customContainerStyle = {
    marginLeft: size.width * 20,
    marginRight: size.width * 20,
    marginTop: size.height * 16,
    marginBottom: size.height * 16,
  };

  return (
    <CommonBottomSheet
      snapPoints={[showKeyboard ? size.height * 540 : size.height * 305]}
      title="링크 추가하기"
      rightButtonType="close"
      onRightButtonPress={onPress}
    >
      <InputContainer>
        <InputField
          placeholder="링크를 입력해주세요."
          placeholderTextColor={colors.grey[200]}
          value={inputValue}
          onChangeValue={text => setInputValue(text)}
          containerStyle={customContainerStyle}
          onFocus={handleInputFocus}
        />
      </InputContainer>
      <ButtonContainer>
        <Button
          width={size.width * 350}
          height={54}
          varient="filled"
          color="primary"
          text="다음"
          onPress={() => {
            if (inputValue.startsWith('http') || inputValue.startsWith('www.')) {
              setDataByLink({ ...dataByLink, url: inputValue });
              {
                onNext();
              }
            }
          }}
        />
      </ButtonContainer>
    </CommonBottomSheet>
  );
};

export default AddLinkBottomSheet;

const ButtonContainer = styled(View)`
  margin: ${size.height * 20}px ${size.width * 20}px ${size.height * 40}px ${size.width * 20}px;
`;

const InputContainer = styled(View)`
  margin: ${size.height * 32}px ${size.width * 32}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.orange};
`;
