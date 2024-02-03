import React, { useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import styled from 'styled-components/native';
import size from '../../../utils/size';
import CommonBottomSheet from '../../base/modal/CommonBottomSheet';
import { body1 } from '../../../styles/fonts';
import Tags from '../../base/Tags';
import InputWithTag from '../../base/InputWithTag';

const AddTagBottomSheets = ({ onPressBack, onPressClose }) => {
  const tags = ['태그', '태그', '태그', '태그', '태그', '태그길이가최대', '7자', '공백포함'];
  const [value, setValue] = useState('');
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
      title="태그 추가"
      leftButtonType="back"
      onLeftButtonPress={onPressBack}
      rightButtonType="done"
      onRightButtonPress={onPressClose}
      snapPoints={[keyboard ? '94.3%' : '62.7%', '105.7%']}
    >
      <InputWrapper>
        <Input
          placeholder="태그를 추가해 주세요."
          value={value}
          onChangeValue={text => setValue(text)}
          isEditPossible={false}
          onFocus={handleInputFocus}
          max={7}
        />
      </InputWrapper>
      {!value && (
        <TagsWrapper>
          <Title>등록된 태그</Title>
          <TagBox>
            {tags.map((tag, idx) => (
              <Tags key={idx} text={tag} height={42} color="default" />
            ))}
          </TagBox>
        </TagsWrapper>
      )}
    </CommonBottomSheet>
  );
};

export default AddTagBottomSheets;

const InputWrapper = styled(View)`
  margin: ${size.height * 25}px ${size.width * 32}px ${size.height * 16}px;
`;

const Input = styled(InputWithTag)`
  width: '100%';
  margin: 0 ${size.height * 16}px;
  align-items: center;
  justify-content: center;
  font-family: ${body1.medium.fontFamily};
  font-size: ${body1.medium.fontSize}px;
`;

const TagsWrapper = styled(View)`
  padding: 0 ${size.width * 20}px;
`;

const Title = styled(Text)`
  margin-top: ${size.width * 9}px;
  margin-bottom: ${size.height * 10}px;
  font-family: ${body1.medium.fontFamily};
  font-size: ${size.width * body1.medium.fontSize}px;
  color: white;
`;

const TagBox = styled(View)`
  flex-direction: row;
  gap: ${size.width * 11}px;
  flex-wrap: wrap;
`;
