import React, { useState } from 'react';
import { Keyboard, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import size from '../../utils/size';
import CommonBottomSheet from '../base/modal/CommonBottomSheet';
import InputWithTag from '../base/InputWithTag';
import { body1, subtitle3 } from '../../styles/fonts';
import Tags from '../base/Tags';
import DeleteOrNoModal from './DeleteOrNotModal';
import CancelOrNotModal from './CancelOrNotModal';
import { colors } from '../../styles/colors';

const TagEditBottomSheet = ({ onClose }) => {
  const [tags, setTags] = useState(['태그예시1', '태그예시2']);
  const [value, setValue] = useState('');
  const [keyboard, setShowKeyboard] = useState(false);
  const [showEndEditModal, setShowEndEditModal] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [bottomSheetTitle, setBottomSheetTitle] = useState('태그 편집');
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);

  const navigation = useNavigation();

  const handleInputFocus = () => {
    setShowKeyboard(true);
    setBottomSheetTitle('태그 추가');
    function onKeyboardDidShow(e) {
      setShowKeyboard(true);
    }
    setShowDeleteButton(false);

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

  // 태그 삭제 관련
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleTagClick = tag => {
    setSelectedTag(tag);
    setShowDeleteConfirmModal(true);
  };

  const handleDeleteTag = () => {
    setTags(currentTags => currentTags.filter(tag => tag !== selectedTag));
    setShowDeleteConfirmModal(false);
  };

  const toggleCancelConfirmModal = () => {
    setShowCancelConfirmModal(!showCancelConfirmModal);
  };

  const handleEndEdit = () => {
    setEditMode(false);
    setShowCancelConfirmModal(false);
    toggleEditMode();
  };

  return (
    <>
      <CommonBottomSheet
        title={bottomSheetTitle}
        leftButtonType="back"
        onLeftButtonPress={() => setShowEndEditModal(true)}
        rightButtonType="done"
        onRightButtonPress={onClose}
        snapPoints={calculateSnapPoints()}
      >
        {tags.length < 3 && (
          <InputWrapper>
            <InputWithTag
              tags={tags}
              setTags={setTags}
              value={value}
              onChangeValue={setValue}
              placeholder="태그를 추가해 주세요."
              onFocus={handleInputFocus}
              max={7}
            />
          </InputWrapper>
        )}
        {!value && (
          <TagsWrapper>
            <TagsHeader>
              <Title>등록된 태그</Title>
              {showDeleteButton && (
                <TouchableOpacity
                  onPress={editMode ? toggleCancelConfirmModal : () => setEditMode(true)}
                >
                  <Delete>{!editMode ? '삭제' : '취소'}</Delete>
                </TouchableOpacity>
              )}
            </TagsHeader>
            <TagBox>
              {tags.map((tag, idx) => (
                <Tags
                  key={idx}
                  text={tag}
                  height={42}
                  color="default"
                  isEditPossible={editMode}
                  onDelete={() => handleTagClick(tag)}
                />
              ))}
            </TagBox>
          </TagsWrapper>
        )}
      </CommonBottomSheet>
      {showEndEditModal && (
        <CancelOrNotModal
          show={showEndEditModal}
          onClose={() => setShowEndEditModal(false)}
          onEndEdit={() => {
            setShowEndEditModal(false);
            onClose();
          }}
        />
      )}
      {showDeleteConfirmModal && (
        <DeleteOrNoModal
          show={showDeleteConfirmModal}
          onClose={() => setShowDeleteConfirmModal(false)}
          onEndEdit={handleDeleteTag}
        />
      )}
      {showCancelConfirmModal && (
        <CancelOrNotModal
          show={showCancelConfirmModal}
          onClose={() => setShowCancelConfirmModal(false)}
          onEndEdit={handleEndEdit}
        />
      )}
    </>
  );
};

export default TagEditBottomSheet;

const InputWrapper = styled(View)`
  margin-left: ${size.height * 16}px;
  margin-right: ${size.height * 16}px;
  padding: ${size.width * 32}px ${size.height * 16}px;
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

const SearchDropDown = styled(View)`
  height: ${size.height * 155}px;
  border-radius: 0 0 12px 12px;
  background-color: ${colors.grey[100]};
  padding: 0 ${size.width * 20}px;
  padding-top: ${size.height * 5}px;
  position: absolute;
  left: ${size.width * 23}px;
  right: ${size.width * 23}px;
  top: ${size.height * 114}px;
`;

const MatchedTagsBox = styled(View)`
  padding: ${size.height * 10}px 0;
`;

const MatchedTagsText = styled(Text)`
  font-family: ${body1.medium.fontFamily};
  font-size: ${size.width * body1.medium.fontSize}px;
  color: white;
`;
