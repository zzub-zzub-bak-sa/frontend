import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import Layout from '../components/layout/Layout';
import size from '../utils/size';
import IcBack from '../assets/icons/IcBack';
import { body1, body2, caption1, title3 } from '../styles/fonts';
import IcSearch from '../assets/icons/IcSearch';
import IcArrowDown from '../assets/icons/IcArrowDown';
import { colors } from '../styles/colors';
import CommonShortBottomSheet from '../components/base/modal/CommonShortBottomSheet';
import { WIDTH } from '../constants/constants';
import CancelOrNotModal from '../components/GalleryScreen/CancelOrNotModal';
import SearchFolder from '../components/share/Search/SearchFolder';
import { showSuccessToast } from '../utils/showSuccessToast';
import CreateFolder from '../components/share/Create/CreateFolder';
import ChangeImage from '../components/share/Create/ChangeImage';
import Grid from '../components/GalleryScreen/Grid';
import YesNoModal from '../components/base/modal/YesNoModal';
import SelectBottomSheet from '../components/base/modal/SelectBottomSheet';
import { getFolder } from '../api/apis/folders';
import { tokenState } from '../store/store';
import { deletePosts } from '../api/apis/posts';

const GalleryScreen = ({ navigation, route }) => {
  const editRef = useRef(null);
  const sortRef = useRef(null);
  const token = useRecoilValue(tokenState);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentEdit, setCurrentEdit] = useState('');
  const [selected, setSelected] = useState([]);
  const [openCancel, setOpenCancel] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [showMoveToast, setShowMoveToast] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('정렬기준');
  const [createNewFolder, setCreateNewFolder] = useState(false);
  const [openChangeImage, setOpenChangeImage] = useState(false);
  const [folderImage, setFolderImage] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [currentFolderId, setCurrentFolderId] = useState(0);

  const { refetch } = useQuery(
    ['get-folder-detail'],
    () => getFolder({ id: route.params?.id, sort: 'newest', token }),
    {
      onSuccess: data => {
        if (data.code === 'OK') {
          console.log(data.data);
          setDetailData(data.data);
          setCurrentFolderId(data.id);
        }
      },
    },
  );

  const { mutate } = useMutation(deletePosts, {
    onSuccess: data => {
      if (data.code === 'OK') {
        refetch();
      }
    },
  });

  useEffect(() => {
    if (route.params?.showToast) {
      if (route.params.toastType === 'deleted') {
        showSuccessToast({
          text1: '삭제되었습니다.',
          text2: '휴지통',
          onPress: () => navigation.navigate('Trash'),
        });
      } else {
        showSuccessToast({
          text1: '이동되었습니다.',
          text2: '보러가기',
          onPressMove: () => {},
        });
      }
      navigation.setParams({ showToast: false, toastType: null });
    }
  }, [navigation, route.params]);

  const handlePostDelete = () => {
    mutate({
      postIds: selected,
    });
  };

  return (
    <Layout>
      <Header>
        <TitleBox onPress={() => navigation.navigate('Main')}>
          <IcBack size={24} color="white" />
          <Title>{detailData.name}</Title>
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SearchGallery', {
              id: currentFolderId,
            })
          }
        >
          <IcSearch size={20} color="white" />
        </TouchableOpacity>
        <SortBox onPress={() => setOpenSort(!openSort)}>
          <SortBoxText>{selectedSort}</SortBoxText>
          <IcArrowDown />
        </SortBox>
      </Row>
      <Grid
        selected={selected}
        onSelect={setSelected}
        currentEdit={currentEdit}
        data={detailData.posts}
      />
      {openCancel && (
        <CancelOrNotModal
          show={openCancel}
          onClose={() => setOpenCancel(false)}
          onStop={() => setCurrentEdit('')}
        />
      )}
      {openDelete && (
        <YesNoModal
          show={openDelete}
          onClose={() => setOpenDelete(false)}
          title="정말 삭제하시겠어요?"
          subtitle="삭제된 콘텐츠는 휴지통으로 이동해요."
          leftText="취소하기"
          onPressLeft={() => setOpenDelete(false)}
          rightText="삭제하기"
          onPressRight={() => {
            handlePostDelete();
            setSelected([]);
            setOpenDelete(false);
            setCurrentEdit('');
          }}
        />
      )}
      {openEdit && (
        <CommonShortBottomSheet
          ref={editRef}
          snapPoints={['20.8%']}
          onSetValue={setCurrentEdit}
          onClose={() => {
            editRef.current.close();

            setTimeout(() => {
              setOpenEdit(false);
            }, 1000);

            refetch();
          }}
          data={['이동', '삭제']}
        />
      )}
      {currentEdit && (
        <SelectBottomSheet
          text={
            selected.length > 0
              ? `${selected.length}개의 항목이 선택되었어요.`
              : `${currentEdit}할 항목을 선택해 주세요.`
          }
          disable={!selected.length}
          onPress={() => {
            if (currentEdit === '삭제') {
              setOpenDelete(true);
            } else {
              setOpenFolder(true);
            }
          }}
        />
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
            setShowMoveToast(true);
          }}
          onPressNewFolder={() => {
            setOpenFolder(false);
            setCreateNewFolder(true);
          }}
        />
      )}
      {openSort && (
        <CommonShortBottomSheet
          ref={sortRef}
          onSetValue={setSelectedSort}
          onClose={() => {
            sortRef.current.close();

            setTimeout(() => {
              setOpenSort(false);
            }, 1000);
          }}
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
