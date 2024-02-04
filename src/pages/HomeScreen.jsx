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
import SearchFolder from '../components/share/Search/SearchFolder';
import CreateFolder from '../components/share/Create/CreateFolder';
import ChangeImage from '../components/share/Create/ChangeImage';
import AddToFolderBottomSheet from '../components/share/AddLInkBottomSheets/AddToFolderBottomSheet';
import AddTagBottomSheet from '../components/share/AddLInkBottomSheets/AddTagBottomSheet';
import { createPosts } from '../api/apis/posts';
import { dataByLinkState } from '../store/store';
import AddTagBottomSheets from '../components/share/AddTagBottomSheets/AddTagBottomSheets';

const data = [
  {
    title: '길이',
    numberOfLinks: 10,
  },
  {
    title: '중간길이',
    numberOfLinks: 100,
  },
  {
    title: '최대길이최대길이최대길이',
    numberOfLinks: 1000,
  },
  {
    title: '길이',
    numberOfLinks: 10,
  },
  {
    title: '중간길이',
    numberOfLinks: 100,
  },
  {
    title: '최대길이최대길이최대길이',
    numberOfLinks: 1000,
  },
  {
    title: '길이',
    numberOfLinks: 10,
  },
  {
    title: '중간길이',
    numberOfLinks: 100,
  },
  {
    title: '최대길이최대길이최대길이',
    numberOfLinks: 1000,
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
  const [openDefault, setOpenDefault] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [openCreateNewFolder, setOpenCreateNewFolder] = useState(false);
  const [openChangeImage, setOpenChangeImage] = useState(false);
  const [folderImage, setFolderImage] = useState(null);
  const [openFinishSavingFolder, setOpenFinishSavingFolder] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);
  const [openTag, setOpenTag] = useState(false);

  const { mutate } = useMutation(createPosts, {
    onSuccess: data => {
      console.log(data);
    },
  });

  useEffect(() => {
    const storage = async () => {
      const uuid = await AsyncStorage.getItem('@device-id');
      if (!uuid) {
        await AsyncStorage.setItem('@device-id', DeviceInfo.getUniqueId());
      }
    };

    storage();
  }, []);

  const handleNext = () => {
    setOpenAddLink(false); // AddLinkBottomSheet 닫기
    setOpenDefault(true); // Default 바텀시트 열기
  };

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
            onEndEditing={() => setFocus(false)}
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
              data={data}
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
      {keyword && <SearchResults />}
      {openAddLink && (
        <AddLinkBottomSheet onPressClose={() => setOpenAddLink(false)} onNext={handleNext} />
      )}

      {openDefault && (
        <SearchFolder
          selected={selectedFolder}
          onPressCard={setSelectedFolder}
          data={[]}
          onClose={() => {
            setOpenDefault(false);
          }}
          onPressNewFolder={() => {
            setOpenDefault(false);
            setOpenCreateNewFolder(true);
          }}
        />
      )}

      {openCreateNewFolder && (
        <CreateFolder
          placeholder="폴더의 이름을 지어주세요."
          onClose={() => {
            setOpenCreateNewFolder(false);
          }}
          onBack={() => {
            setOpenCreateNewFolder(false);
            setOpenDefault(true);
          }}
          onChangeImage={() => {
            setOpenCreateNewFolder(false);
            setOpenChangeImage(true);
          }}
          onPressNext={() => {
            setOpenCreateNewFolder(false);
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
          }}
        />
      )}

      {openFinishSavingFolder && (
        <AddToFolderBottomSheet
          onPressClose={() => {
            setOpenFinish(false);
            setOpenFinish(true);
          }}
          onPressGoTag={() => {
            setOpenFinish(false);
            setOpenTag(true);
          }}
        />
      )}

      {openTag && <AddTagBottomSheets />}

      {openFinish && <AddTagBottomSheet onPressClose={() => setOpenFinish(false)} />}
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
