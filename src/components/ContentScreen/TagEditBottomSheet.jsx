import React, { useState } from 'react';
import { Keyboard, Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import size from '../../utils/size';
import CommonBottomSheet from '../base/modal/CommonBottomSheet';
import InputField from '../../components/base/InputField';
import { body1, subtitle3 } from '../../styles/fonts';
import Tags from '../base/Tags';
import CommonModal from '../base/modal/CommonModal';

const TagEditBottomSheet = ({ onPressBack, onPressClose }) => {
  const tags = ['태그예시1', '태그예시2'];
  const [value, setValue] = useState('');
  const [keyboard, setShowKeyboard] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bottomSheetTitle, setBottomSheetTitle] = useState('태그 편집');

  const handleInputFocus = () => {
    setShowKeyboard(true);
    setBottomSheetTitle('태그 추가');
    function onKeyboardDidShow(e) {
      setShowKeyboard(true);
    }

    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    return () => {
      showSubscription.remove();
    };
  };

  const calculateSnapPoints = () => {
    if (tags.length < 3) {
      return [keyboard ? size.height * 500 : size.height * 342];
    } else {
      return [size.height * 246, size.height * 246];
    }
  };

  const toggleEditMode = () => {
    if (editMode) {
      setShowConfirmModal(true);
    } else {
      setEditMode(true);
    }
  };

  return (
    <>
      <CommonBottomSheet
        title={bottomSheetTitle}
        leftButtonType="back"
        onLeftButtonPress={onPressBack}
        rightButtonType="done"
        onRightButtonPress={onPressClose}
        snapPoints={calculateSnapPoints()}
      >
        {tags.length < 3 && (
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
        )}
        {!value && (
          <TagsWrapper>
            <TagsHeader>
              <Title>등록된 태그</Title>
              <TouchableOpacity onPress={toggleEditMode}>
                <Delete>{!editMode ? '삭제' : '취소'}</Delete>
              </TouchableOpacity>
            </TagsHeader>
            <TagBox>
              {tags.map((tag, idx) => (
                <Tags key={idx} text={tag} height={42} color="default" isEditPossible={editMode} />
              ))}
            </TagBox>
          </TagsWrapper>
        )}
      </CommonBottomSheet>
      <CommonModal
        isVisible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="정말 취소하시겠습니까?"
        message="변경사항이 사라져요."
        buttons={[
          {
            text: '취소하기',
            onPress: () => {
              setEditMode(false);
              setShowConfirmModal(false);
            },
            varient: 'yes',
            color: 'mdright',
          },
          {
            text: '삭제하기',
            onPress: () => setShowConfirmModal(false),
            varient: 'no',
            color: 'mdright',
          },
        ]}
      />
    </>
  );
};

export default TagEditBottomSheet;

const InputWrapper = styled(View)`
  margin: ${size.height * 25}px ${size.width * 32}px ${size.height * 16}px;
`;

const Input = styled(InputField)`
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

const TagsHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Delete = styled(Text)`
  color: white;
  margin-right: ${size.width * 11}px;
  font-family: ${subtitle3.bold.fontFamily};
  font-size: ${subtitle3.bold.fontSize};
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
