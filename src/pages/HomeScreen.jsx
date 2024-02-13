import React, { useEffect, useState } from 'react';
import { FlatList, Platform, Text, TextInput, View } from 'react-native';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import DeviceInfo from 'react-native-device-info';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import Layout from '../components/layout/Layout';
import Header from '../components/layout/Header';
import size from '../utils/size';
import IcSearch from '../assets/icons/IcSearch';
import { body1, caption1, subtitle3 } from '../styles/fonts';
import { colors } from '../styles/colors';
import IcArrowDown from '../assets/icons/IcArrowDown';
import Folder from '../components/HomeScreen/Folder';
import { WIDTH } from '../constants/constants';
import IcPlus from '../assets/icons/IcPlus';
import IcClearCircle from '../assets/icons/IcClearCircle';
import SearchResults from '../components/HomeScreen/SearchResults';
import CommonShortBottomSheet from '../components/base/modal/CommonShortBottomSheet';
import EditBottomSheet from '../components/HomeScreen/EditBottomSheet';
import AddLinkBottomSheet from '../components/HomeScreen/AddLinkBottomSheet';
import CreateFolder from '../components/share/Create/CreateFolder';
import ChangeImage from '../components/share/Create/ChangeImage';
import AddToFolderBottomSheet from '../components/share/AddLInkBottomSheets/AddToFolderBottomSheet';
import AddTagBottomSheet from '../components/share/AddLInkBottomSheets/AddTagBottomSheet';
import { createPosts } from '../api/apis/posts';
import { dataByLinkState } from '../store/store';
import AddTagBottomSheets from '../components/share/AddTagBottomSheets/AddTagBottomSheets';
import SelectFolderBottomSheets from '../components/share/SelectFolderBottomSheets';

let data = [
  {
    title: '홍대맛집',
    numberOfLinks: 20,
  },
  {
    title: '송파',
    numberOfLinks: 100,
  },
  {
    title: '전주맛집',
    numberOfLinks: 1000,
  },
  {
    title: '짜장과짬뽕',
    numberOfLinks: 10,
  },
  {
    title: '엄마 생신 파티',
    numberOfLinks: 20,
  },
  {
    title: '역시밥은쌀밥이지',
    numberOfLinks: 100,
  },

  {
    title: '경남 맛집',
    numberOfLinks: 1000,
  },
  {
    title: '경주 맛집 투어',
    numberOfLinks: 100,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const dataByLink = useRecoilValue(dataByLinkState);
  const [keyword, setKeyword] = useState('');
  const [focus, setFocus] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [sort, setSort] = useState('가나다순');
  const [openEdit, setOpenEdit] = useState({
    condition: false,
    id: 0,
  });
  const [openAddLink, setOpenAddLink] = useState(false);
  const [openSelectFolder, setOpenSelectFolder] = useState(false);
  const [openSearchFolder, setOpenSearchFolder] = useState(false);
  const [createNewFolder, setCreateNewFolder] = useState(false);
  const [openChangeImage, setOpenChangeImage] = useState(false);
  const [folderImage, setFolderImage] = useState(0);
  const [openFinishSavingFolder, setOpenFinishSavingFolder] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);
  const [openTag, setOpenTag] = useState(false);
  const [tags, setTags] = useState([]);
  const [imageChange, setImageChange] = useState(false);
  const [fixedKeyword, setFixedKeyword] = useState('');

  const { mutate } = useMutation(createPosts, {
    onSuccess: data => {
      console.log(data);
      setOpenFinishSavingFolder(true);
    },
  });

  const storage = async () => {
    // try {
    //   const uuid = await AsyncStorage.getItem('@device-id');
    //   if (!uuid) {
    //     await AsyncStorage.setItem('@device-id', DeviceInfo.getUniqueId());
    //   }
    // } catch (error) {
    //   console.error('An error occurred while accessing storage:', error);
    // }
  };

  useEffect(() => {
    storage();
  }, []);

  return (
    <Layout>
      <Header />
      <InputWrapper>
        <InputBox focus={focus}>
          <IcSearch />
          <Input
            placeholder="폴더,태그를 검색해 보세요!"
            placeholderTextColor={colors.grey[200]}
            value={keyword}
            onChangeText={text => setKeyword(text)}
            onFocus={() => setFocus(true)}
            onEndEditing={() => {
              setFocus(false);
              setFixedKeyword(keyword);
            }}
          />
          {keyword && (
            <TouchableOpacity onPress={() => setKeyword('')}>
              <IcClearCircle />
            </TouchableOpacity>
          )}
        </InputBox>
      </InputWrapper>
      {!keyword && !focus && (
        <>
          <Content>
            <SelectBox onPress={() => setOpenSort(true)}>
              <SelectText>{sort}</SelectText>
              <IcArrowDown />
            </SelectBox>
            <FlatList
              data={data.filter(el => el.title.includes(keyword))}
              renderItem={({ item, index }) => (
                <Folder
                  index={index}
                  title={item.title}
                  numberOfLinks={item.numberOfLinks}
                  onPressKebab={() => setOpenEdit({ condition: true, id: index })}
                  onPress={() => navigation.navigate('Gallery')}
                />
              )}
              keyExtractor={(_, index) => String(index)}
              numColumns={2}
              ListFooterComponent={<FooterComponent />}
            />
          </Content>
          <FloatingBox>
            <FloatingButton onPress={() => setOpenAddLink(true)}>
              <IcPlus />
              <FloatingButtonText>링크 추가하기</FloatingButtonText>
            </FloatingButton>
          </FloatingBox>
        </>
      )}
      {openSort && (
        <CommonShortBottomSheet
          onSetValue={setSort}
          onClose={() => setOpenSort(false)}
          data={['가나다순', '최신순', '오래된순']}
        />
      )}
      {openEdit.condition && (
        <EditBottomSheet
          onClose={() => setOpenEdit({ ...openEdit, condition: false })}
          index={openEdit.id}
        />
      )}
      {fixedKeyword && <SearchResults />}
      {openAddLink && (
        <AddLinkBottomSheet
          onPress={() => setOpenAddLink(false)}
          onNext={() => {
            setOpenAddLink(false);
            setOpenSelectFolder(true);
          }}
        />
      )}
      {openSelectFolder && (
        <SelectFolderBottomSheets
          onClose={() => setOpenSelectFolder('')}
          onNext={() => {
            setOpenSelectFolder('');
            setOpenFinishSavingFolder(true);
          }}
          onSearch={() => {
            setOpenSelectFolder(false);
            setOpenSearchFolder(true);
          }}
          onPressNewFolder={() => {
            setOpenSelectFolder(false);
            setCreateNewFolder(true);
          }}
        />
      )}
      {createNewFolder && (
        <CreateFolder
          placeholder="폴더의 이름을 지어주세요."
          folderImage={folderImage}
          imageChange={folderImage !== 0}
          onClose={() => {
            setCreateNewFolder(false);
          }}
          onBack={() => {
            setCreateNewFolder(false);
            setOpenSelectFolder(true);
          }}
          onChangeImage={() => {
            setOpenChangeImage(true);
            setCreateNewFolder(false);
          }}
          onNext={() => {
            setCreateNewFolder(false);
            setOpenFinishSavingFolder(true);
          }}
        />
      )}

      {openChangeImage && (
        <ChangeImage
          folderImage={folderImage}
          onPressSelect={setFolderImage}
          onClose={() => {
            setOpenChangeImage(false);
            setImageChange(true);
            setCreateNewFolder(true);
          }}
        />
      )}

      {openFinishSavingFolder && (
        <AddToFolderBottomSheet
          fromHomeScreen={true}
          onPressClose={() => {
            setOpenFinishSavingFolder(false);
          }}
          onPressGoTag={() => {
            setOpenFinishSavingFolder(false);
            setOpenTag(true);
          }}
        />
      )}

      {openTag && (
        <AddTagBottomSheets
          onPressBack={() => {
            setOpenTag(false);
            setOpenFinishSavingFolder(true);
          }}
          onPressClose={() => {
            setOpenTag(false);
            setOpenFinish(true);
          }}
          tags={tags}
          setTags={setTags}
        />
      )}

      {openFinish && (
        <AddTagBottomSheet
          fromHomeScreen={true}
          onPressClose={() => {
            setOpenFinish(false);
            data = [
              {
                title: '연남맛집',
                numberOfLinks: 1,
              },
              ...data,
            ];
          }}
        />
      )}
    </Layout>
  );
};

export default HomeScreen;

const InputWrapper = styled(View)`
  height: ${size.height * 72}px;
  margin: 0 ${size.width * 24}px;
  justify-content: center;
`;

const InputBox = styled(View)`
  flex-direction: row;
  gap: ${size.width * 16}px;
  padding-bottom: ${size.height * 13}px;
  border-bottom-color: ${({ focus }) => (focus ? colors.orange : 'white')};
  border-bottom-width: 1px;
`;

const Input = styled(TextInput)`
  width: ${size.width * (WIDTH - 125)}px;
  font-family: ${body1.medium.fontFamily};
  font-size: ${body1.medium.fontSize}px;
  color: white;
`;

const Content = styled(View)`
  margin-top: ${size.height * 4}px;
  padding: 0 ${size.width * 20}px;
`;

const SelectBox = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: ${size.height * 20}px;
`;

const SelectText = styled(Text)`
  font-family: ${caption1.semibold.fontFamily};
  font-size: ${caption1.semibold.fontSize}px;
  color: ${colors.grey[500]};
`;

const FooterComponent = styled(View)`
  height: ${size.height * 150}px;
`;

const FloatingBox = styled(View)`
  position: absolute;
  bottom: 41px;
  width: ${WIDTH}px;
  align-items: center;
`;

const FloatingButton = styled(TouchableOpacity)`
  width: ${size.width * 127}px;
  height: ${size.height * 37}px;
  border-radius: 21px;
  background-color: ${colors.orange};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 4px 8px;
      shadow-opacity: 0.2;
      shadow-radius: 20px;
    `,
    android: `
      elevation: 5;
    `,
  })}
`;

const FloatingButtonText = styled(Text)`
  font-family: ${subtitle3.bold.fontFamily};
  font-size: ${subtitle3.bold.fontSize}px;
  color: white;
`;
