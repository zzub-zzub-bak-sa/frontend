import React, { useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import size from '../../../utils/size';
import CommonBottomSheet from '../../base/modal/CommonBottomSheet';
import { body1 } from '../../../styles/fonts';
import Tags from '../../base/Tags';
import InputWithTag from '../../base/InputWithTag';
import { dataByLinkState, tokenState } from '../../../store/store';
import { getTagsByFolderId } from '../../../api/apis/tags';

const AddTagBottomSheets = ({ onPressBack, onPressClose }) => {
  const token = useRecoilValue(tokenState);
  const [dataByLink, setDataByLink] = useRecoilState(dataByLinkState);
  const [value, setValue] = useState('');
  const [keyboard, setShowKeyboard] = useState(false);
  const [tags, setTags] = useState([]);
  const [currentFolderTags, setCurrentFolderTags] = useState([]);

  useQuery(
    ['get-tags-by-folders'],
    () => getTagsByFolderId({ folderId: dataByLink.folderId, token }),
    {
      onSuccess: data => {
        if (data.code === 'OK') {
          setCurrentFolderTags(data.data);
        }
      },
    },
  );

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
      onRightButtonPress={() => {
        setDataByLink({ ...dataByLink, tags });
        onPressClose();
      }}
      snapPoints={[keyboard ? size.height * 362 : size.height * 810]}
    >
      <InputWrapper>
        <Input
          placeholder="태그를 추가해 주세요."
          value={value}
          onChangeValue={setValue}
          isEditPossible={false}
          onFocus={handleInputFocus}
          tags={tags}
          setTags={setTags}
          max={7}
        />
      </InputWrapper>
      {!value && (
        <TagsWrapper>
          <Title>등록된 태그</Title>
          <TagBox>
            {[...new Set(currentFolderTags)].map((tag, index) => (
              <Tags key={tag} text={tag} height={42} color="default" />
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
  width: 100%;
  margin: 0 ${size.height * 16}px;
  align-items: center;
  justify-content: center;
  font-family: ${body1.medium.fontFamily};
  font-size: ${body1.medium.fontSize}px;
`;

const TagsWrapper = styled(View)`
  padding: 0 ${size.width * 20}px;
  margin-bottom: ${size.height * 32}px;
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
