import React, { useEffect, useRef, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import Layout from '../components/layout/Layout';
import IcBack from '../assets/icons/IcBack';
import size from '../utils/size';
import { body2, title3 } from '../styles/fonts';
import IcSearch from '../assets/icons/IcSearch';
import IcArrowDown from '../assets/icons/IcArrowDown';
import { SortBox, SortBoxText } from './GalleryScreen';
import CommonShortBottomSheet from '../components/base/modal/CommonShortBottomSheet';
import Grid from '../components/GalleryScreen/Grid';
import { colors } from '../styles/colors';
import IcTrash from '../assets/icons/IcTrash';
import YesNoModal from '../components/base/modal/YesNoModal';
import SelectBottomSheet from '../components/base/modal/SelectBottomSheet';
import CancelOrNotModal from '../components/GalleryScreen/CancelOrNotModal';
import { showSuccessToast } from '../utils/showSuccessToast';
import { getDeletedPosts } from '../api/apis/posts';
import { tokenState } from '../store/store';

const TrashBinScreen = ({ navigation, route }) => {
  const sortRef = useRef(null);
  const token = useRecoilValue(tokenState);
  const [selectedSort, setSelectedSort] = useState('정렬기준');
  const [openSort, setOpenSort] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openRestore, setOpenRestore] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [openCancel, setOpenCancel] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [deletePosts, setDeletedPosts] = useState([]);

  useQuery(['get-deleted-posts'], () => getDeletedPosts(token), {
    onSuccess: data => {
      if (data.code === 'OK') {
        setDeletedPosts(data.data);
        console.log('삭제된 게시물 가져오기 성공', data.data);
      }
    },
    onError: error => {
      console.error('삭제된 게시물 가져오기 실패', error);
    },
  });

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
      <Container>
        <Header onPress={() => navigation.navigate('Main')}>
          <LeftHeader onPress={() => navigation.navigate('MyPage')}>
            <IcBack size={24} color="white" />
            <Title>휴지통</Title>
          </LeftHeader>
          <TouchableOpacity
            onPress={() => (openRestore ? setOpenCancel(true) : setOpenRestore(true))}
          >
            <Restore>{openRestore ? '취소' : '복구'}</Restore>
          </TouchableOpacity>
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
      </Container>
      <GridBox>
        <Grid
          selected={selectedItems}
          onSelect={setSelectedItems}
          currentEdit={openRestore}
          data={deletePosts}
        />
      </GridBox>
      {openSort && (
        <CommonShortBottomSheet
          ref={sortRef}
          onClose={() => {
            sortRef?.current?.close();

            setTimeout(() => {
              setOpenSort(false);
            }, 1000);
          }}
          onSetValue={setSelectedSort}
          data={['가나다순', '최신순', '오래된순']}
        />
      )}
      <FloatingDelete>
        <TouchableOpacity onPress={() => setOpenDelete(true)}>
          <IcTrash />
        </TouchableOpacity>
      </FloatingDelete>
      {openDelete && (
        <YesNoModal
          title="휴지통을 비우시겠어요?"
          subtitle="콘텐츠가 모두 영구적으로 사라져요"
          leftText="취소하기"
          onPressLeft={() => setOpenDelete(false)}
          rightText="삭제하기"
          onPressRight={() => navigation.navigate('MyPage')}
        />
      )}
      {openCancel && (
        <CancelOrNotModal
          show={openCancel}
          onClose={() => setOpenCancel(false)}
          onStop={() => {
            setSelectedItems([]);
            setOpenRestore(false);
          }}
        />
      )}
      {openRestore && (
        <SelectBottomSheet
          text={
            selectedItems.length > 0
              ? `${selectedItems.length}개의 항목이 선택되었어요.`
              : `복구할 항목을 선택해 주세요.`
          }
          disable={!selectedItems.length}
          onPress={() => {
            setOpenRestore(false);
            setShowToast(true);
          }}
        />
      )}
    </Layout>
  );
};

export default TrashBinScreen;

const Container = styled(View)`
  padding: 0 ${size.width * 20}px;
`;

const Header = styled(TouchableOpacity)`
  height: ${size.height * 60}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${size.height * 20}px;
`;

const Title = styled(Text)`
  font-family: ${title3.semibold.fontFamily};
  font-size: ${title3.semibold.fontSize}px;
  color: white;
`;

const LeftHeader = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  gap: ${size.width * 8}px;
`;

const Row = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${size.width * 8}px;
  margin-top: ${size.height * 38.5}px;
`;

const Restore = styled(Text)`
  font-family: ${body2.medium.fontFamily};
  font-size: ${body2.medium.fontSize}px;
  color: white;
`;

const GridBox = styled(View)`
  margin-top: ${size.height * 20}px;
`;

const FloatingDelete = styled(View)`
  width: ${size.width * 56}px;
  height: ${size.width * 56}px;
  background-color: ${colors.bg[200]};
  border-radius: 31px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 54px;
  right: 24px;
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 0px -10px;
      shadow-opacity: 0.15;
      shadow-radius: 10px;
    `,
    android: `
      elevation: 5; /* For Android, use elevation instead of shadow properties */
    `,
  })}
`;
