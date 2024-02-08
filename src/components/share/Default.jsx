import React, { useRef, useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import CommonBottomSheet from '../base/modal/CommonBottomSheet';
import Button from '../base/Button';
import Card from '../base/Card';
import Folder from '../../assets/icons/Folder';
import IcSearch from '../../assets/icons/IcSearch';
import { WIDTH } from '../../constants/constants';
import size from '../../utils/size';
import CreateFolder from './Create/CreateFolder';
import SearchFolder from './Search/SearchFolder';
import SearchInput from '../base/SearchInput';
import NoSearchResult from './Search/NoSearchResult';

const Default = ({ onClose, onPressNewFolder, onNext }) => {
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();

  const [showKeyboard, setShowKeyboard] = useState(false);
  const [doSearch, setDoSearch] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [openAddFolder, setOpenAddFolder] = useState(false);
  const [openSearchFolder, setOpenSearchFolder] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState(null);

  const folders = [
    { title: ' 폴더명 최대 노출 길이 여...', numberOfLinks: 10 },
    { title: '폴더명 최대 노출 길이 여...', numberOfLinks: 20 },
    { title: '폴더명 최대 노출 길이 여...', numberOfLinks: 30 },
    { title: '폴더명 최대 노출 길이 여...', numberOfLinks: 30 },
    { title: '폴더명 최대 노출 길이 여...', numberOfLinks: 30 },
    { title: '폴더명 최대 노출 길이 여...', numberOfLinks: 30 },
    { title: '폴더명 최대 노출 길이 여...', numberOfLinks: 30 },
    { title: '폴더명 최대 노출 길이 여...', numberOfLinks: 30 },
    { title: '폴더명 최대 노출 길이 여...', numberOfLinks: 30 },
    { title: '폴더명 최대 노출 길이 여...', numberOfLinks: 30 },
  ];

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

  const calculateSnapPoints = () => {
    if (showKeyboard) {
      return [size.height * 593];
    } else if (doSearch) {
      if (searchResults.length > 0) {
        return [size.height * 310];
      } else {
        return [size.height * 360];
      }
    } else {
      return [size.height * 640];
    }
  };

  return (
    <>
      <CommonBottomSheet
        ref={bottomSheetRef}
        snapPoints={calculateSnapPoints()}
        title="폴더 선택"
        leftButtonType="none"
        rightButtonType="close"
        onRightButtonPress={onClose}
      >
        <ButtonsContainer>
          <Button
            width={93}
            height={36}
            varient="filled"
            color="default"
            text="폴더추가"
            renderIcon={() => <Folder size={24} />}
            onPress={onPressNewFolder}
          />
          {!doSearch ? (
            <TouchableOpacity onPress={() => setDoSearch(true)}>
              <IcSearch size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <SearchInput width={size.width * (WIDTH - 163)} onFocus={handleInputFocus} />
          )}
        </ButtonsContainer>
        <StyledScrollView doSearch={doSearch} searchResultsLength={searchResults.length}>
          {doSearch ? (
            searchResults.length > 0 ? (
              searchResults.map(el => (
                <Card
                  key={el}
                  title={el}
                  numberOfLinks={99}
                  isSelected={selected === el}
                  onPress={() => setSelected(el)}
                />
              ))
            ) : (
              <NoSearchResult onAddFolder={onPressNewFolder} />
            )
          ) : (
            folders.map((folder, index) => (
              <FolderCard
                key={String(folder.numberOfLinks + folder.title + index)}
                title={folder.title}
                numberOfLinks={folder.numberOfLinks}
                onPress={() => setSelectedFolder(index)}
                isSelected={selectedFolder === index}
              />
            ))
          )}
        </StyledScrollView>
        {(!doSearch || (doSearch && searchResults.length > 0)) && (
          <ButtonContainer>
            <Button
              width={350}
              height={54}
              text="선택하기"
              varient="filled"
              color="primary"
              onPress={() => {
                onNext();
              }}
            />
          </ButtonContainer>
        )}
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

const ButtonContainer = styled(View)`
  padding-left: ${size.width * 16}px;
  padding-bottom: ${size.height * 16}px;
  margin-bottom: ${size.height * 33}px;
`;
const StyledScrollView = styled(ScrollView)`
  height: ${({ doSearch, searchResultsLength }) =>
    doSearch
      ? searchResultsLength > 0
        ? size.height * 310
        : size.height * 230
      : size.height * 395}px;
`;
