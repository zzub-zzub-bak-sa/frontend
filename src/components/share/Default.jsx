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
import SearchFolder from './Search/SearchFolder';
import CreateFolder from './Create/CreateFolder';

const Default = () => {
  const bottomSheetRef = useRef(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const ref = useRef(null);

  const [selectedFolder, setSelectedFolder] = useState(null);
  const [openAddFolder, setOpenAddFolder] = useState(false);
  const [openSearchFolder, setOpenSearchFolder] = useState(false);

  const folders = [
    { title: ' 폴더명 최대 노출 길이 여...', numberOfLinks: 10 },
    { title: '폴더명 최대 노출 길이 여...', numberOfLinks: 20 },
    { title: '폴더명 최대 노출 길이 여...', numberOfLinks: 30 },
    { title: '폴더명 최대 노출 길이 여...', numberOfLinks: 30 },
  ];

  const handleNext = () => {
    setOpenDefault(false);
    setOpenAddFolder(true);
  };

  return (
    <>
      <CommonBottomSheet
        ref={bottomSheetRef}
        snapPoints={[size.height * 640]}
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
            onPress={() => {
              setOpenAddFolder(true);
              setSelectedFolder(false);
            }}
          />
          <TouchableOpacity onPress={() => setOpenSearchFolder(true)}>
            <Search size={24} />
          </TouchableOpacity>
        </ButtonsContainer>
        <FolderListContainer>
          <ScrollViewContainer>
            {folders.map((folder, index) => (
              <FolderCard
                key={`folder-${index}`}
                title={folder.title}
                numberOfLinks={folder.numberOfLinks}
                onPress={() => setSelectedFolder(index)}
                isSelected={selectedFolder === index}
              />
            ))}
          </ScrollViewContainer>
        </FolderListContainer>
        <ButtonContainer>
          <Button width={350} height={54} text="선택하기" varient="filled" color="primary" />
        </ButtonContainer>
      </CommonBottomSheet>

      {openAddFolder && (
        <CreateFolder
          onClose={() => {
            setOpenAddFolder(false);
          }}
        />
      )}

      {openSearchFolder && (
        <SearchFolder
          onClose={() => {
            setOpenSearchFolder(false);
          }}
        />
      )}
    </>
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
  margin-bottom: ${size.height * 33};
`;
