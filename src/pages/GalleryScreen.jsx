import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Layout from '../components/layout/Layout';
import size from '../utils/size';
import IcBack from '../assets/icons/IcBack';
import { body1, body2, caption1, title3 } from '../styles/fonts';
import IcSearch from '../assets/icons/IcSearch';
import IcArrowDown from '../assets/icons/IcArrowDown';
import { colors } from '../styles/colors';
import CommonShortBottomSheet from '../components/base/modal/CommonShortBottomSheet';
import Check from '../assets/icons/Check';
import { WIDTH } from '../constants/constants';
import Button from '../components/base/Button';
import CancelOrNotModal from '../components/GalleryScreen/CancelOrNotModal';
import SearchFolder from '../components/share/Search/SearchFolder';
import { showSuccessToast } from '../utils/showSuccessToast';
import CreateFolder from '../components/share/Create/CreateFolder';
import ChangeImage from '../components/share/Create/ChangeImage';
import Grid from '../components/GalleryScreen/Grid';

const GalleryScreen = () => {
  const navigation = useNavigation();
  const [openEdit, setOpenEdit] = useState(false);
  const [currentEdit, setCurrentEdit] = useState('');
  const [selected, setSelected] = useState([]);
  const [openCancel, setOpenCancel] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('정렬기준');
  const [createNewFolder, setCreateNewFolder] = useState(false);
  const [openChangeImage, setOpenChangeImage] = useState(false);
  const [folderImage, setFolderImage] = useState('');

  useEffect(() => {
    if (showToast) {
      showSuccessToast({
        text1: '이동되었습니다.',
        text2: '보러가기',
        onPressMove: () => null,
      });
      setShowToast(false);
    }
  }, [showToast]);

  return (
    <Layout>
      <Header>
        <TitleBox>
          <IcBack size={24} color="white" />
          <Title>폴더제목 최대글자수 16자입</Title>
        </TitleBox>
        {currentEdit ? (
          <TouchableOpacity onPress={() => setOpenCancel(true)}>
            <Edit>취소</Edit>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setOpenEdit(true)}>
            <Edit>편집</Edit>
          </TouchableOpacity>
        )}
      </Header>
      <Row>
        <TouchableOpacity onPress={() => navigation.navigate('SearchGallery')}>
          <IcSearch size={20} color="white" />
        </TouchableOpacity>
        <SortBox onPress={() => setOpenSort(true)}>
          <SortBoxText>{selectedSort}</SortBoxText>
          <IcArrowDown />
        </SortBox>
      </Row>
      <Grid selected={selected} onSelect={setSelected} currentEdit={currentEdit} />
      {openCancel && (
        <CancelOrNotModal
          show={openCancel}
          onClose={() => setOpenCancel(false)}
          onEndEdit={() => setCurrentEdit('')}
        />
      )}
      {openEdit && (
        <CommonShortBottomSheet
          snapPoints={['20.8%']}
          onSetValue={setCurrentEdit}
          onClose={() => setOpenEdit(false)}
          data={['이동', '삭제']}
        />
      )}
      {currentEdit === '이동' && (
        <Select>
          <SelectText>이동할 항목을 선택해 주세요.</SelectText>
          <Button
            height={36}
            width={51}
            text="다음"
            varient="filled"
            color="disable"
            onPress={() => setOpenFolder(true)}
          />
        </Select>
      )}
      {openFolder && (
        <SearchFolder
          selected={selectedFolder}
          onPressCard={setSelectedFolder}
          data={[]}
          onClose={() => {
            setOpenFolder(false);
            setCurrentEdit('');
            setSelected([]);
            setShowToast(true);
          }}
          onPressNewFolder={() => {
            setOpenFolder(false);
            setCreateNewFolder(true);
          }}
        />
      )}
      {openSort && (
        <CommonShortBottomSheet
          onSetValue={setSelectedSort}
          onClose={() => setOpenSort(false)}
          data={['가나다순', '최신순', '오래된순']}
        />
      )}
      {createNewFolder && (
        <CreateFolder
          placeholder="폴더의 이름을 지어주세요."
          onClose={() => {
            setCreateNewFolder(false);
            setCurrentEdit('');
            setSelected([]);
          }}
          onBack={() => {
            setCreateNewFolder(false);
            setOpenFolder(true);
          }}
          onChangeImage={() => {
            setCreateNewFolder(false);
            setOpenChangeImage(true);
          }}
        />
      )}
      {openChangeImage && (
        <ChangeImage
          folderImage={folderImage}
          onPressSelect={setFolderImage}
          onClose={() => {
            setOpenChangeImage(false);
            setCurrentEdit('');
            setSelected([]);
          }}
        />
      )}
    </Layout>
  );
};

export default GalleryScreen;

const Header = styled(View)`
  height: ${size.height * 60}px;
  padding: 0 ${size.width * 20}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${size.height * 12}px;
  margin-bottom: ${size.height * 22}px;
`;

const TitleBox = styled(TouchableOpacity)`
  flex-direction: row;
  gap: ${size.width * 8}px;
  margin-left: -4px;
`;

const Title = styled(Text)`
  font-family: ${title3.semibold.fontFamily};
  font-size: ${title3.semibold.fontSize}px;
  color: white;
`;

const Edit = styled(Text)`
  font-family: ${body2.medium.fontFamily};
  font-size: ${body2.medium.fontSize}px;
  color: white;
`;

const Row = styled(View)`
  padding: 0 ${size.width * 20}px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${size.height * 20}px;
`;

export const SortBox = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

export const SortBoxText = styled(Text)`
  font-family: ${caption1.semibold.fontFamily};
  font-size: ${caption1.semibold.fontSize}px;
  color: white;
`;

const Select = styled(View)`
  width: ${WIDTH}px;
  height: ${size.height * 96}px;
  background-color: ${colors.grey[200]};
  position: absolute;
  bottom: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${size.width * 20}px;
`;

const SelectText = styled(Text)`
  font-family: ${body1.medium.fontFamily};
  font-size: ${body1.medium.fontSize}px;
  color: ${colors.grey[400]};
`;
