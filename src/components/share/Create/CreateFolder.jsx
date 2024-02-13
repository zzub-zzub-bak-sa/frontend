import React, { useState } from 'react';
import { View, Image, Keyboard, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import CommonBottomSheet from '../../base/modal/CommonBottomSheet';
import Button from '../../base/Button';
import { colors } from '../../../styles/colors';
import size from '../../../utils/size';
import InputField from '../../base/InputField';
import { dataByLinkState } from '../../../store/store';

const CreateFolder = ({
  placeholder = '태그를 입력하세요',
  onClose,
  onBack,
  onChangeImage,
  onNext,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [dataByLink, setDataByLink] = useRecoilState(dataByLinkState);

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
      snapPoints={[showKeyboard ? size.height * 803 : size.height * 467]}
      title="새로운 폴더"
      leftButtonType="back"
      onLeftButtonPress={onBack}
      rightButtonType="done"
      // onRightButtonPress={onClose}
    >
      <ImageBox onPress={onChangeImage}>
        <FolderImage source={require('../../../assets/images/editFolder.png')} />
      </ImageBox>
      <InputContainer>
        <InputField
          placeholder={placeholder}
          placeholderTextColor={colors.grey[200]}
          value={inputValue}
          onChangeValue={setInputValue}
          maxLength={16}
          onFocus={() => handleInputFocus()}
        />
      </InputContainer>
      <ButtonContainer>
        <Button
          width={350}
          height={54}
          text="선택하기"
          varient="filled"
          color="primary"
          onPress={() => {
            setDataByLink({ ...dataByLink, folderId: 1 });
            onNext();
          }}
        />
      </ButtonContainer>
    </CommonBottomSheet>
  );
};

export default CreateFolder;

const ButtonContainer = styled(View)`
  border-radius: 12px;
  margin: ${size.height * 32}px ${size.width * 20}px ${size.height * 20}px ${size.width * 20}px;
  background-color: ${colors.grey[100]};
`;

const ImageBox = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  padding: ${size.height * 45}px 0;
`;

const InputContainer = styled(View)`
  margin: ${size.height * 16}px ${size.width * 23}px;
  padding-bottom: ${size.height * 13}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.orange};
`;

const FolderImage = styled(Image)`
  width: ${size.width * 100}px;
  height: ${size.height * 100}px;
  overflow: visible;
`;
