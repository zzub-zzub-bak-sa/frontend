/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from '../components/layout/Layout';
import Header from '../components/layout/Header';
import size from '../utils/size';
import { subtitle3 } from '../styles/fonts';
import { colors } from '../styles/colors';
import { WIDTH } from '../constants/constants';
import IcPlus from '../assets/icons/IcPlus';
import SearchResults from '../components/HomeScreen/SearchResults';
import CommonShortBottomSheet from '../components/base/modal/CommonShortBottomSheet';
import AddLinkBottomSheet from '../components/HomeScreen/AddLinkBottomSheet';
import CreateFolder from '../components/share/Create/CreateFolder';
import ChangeImage from '../components/share/Create/ChangeImage';
import AddToFolderBottomSheet from '../components/share/AddLInkBottomSheets/AddToFolderBottomSheet';
import AddTagBottomSheet from '../components/share/AddLInkBottomSheets/AddTagBottomSheet';
import { tokenState, userState } from '../store/store';
import AddTagBottomSheets from '../components/share/AddTagBottomSheets/AddTagBottomSheets';
import SelectFolderBottomSheets from '../components/share/SelectFolderBottomSheets';
import { createUser, signin } from '../api/apis/account';
import SearchBox from '../components/HomeScreen/SearchBox';
import FolderList from '../components/HomeScreen/FolderList';
import { getFolderForHome } from '../api/apis/folders';

import EditBottomSheet from '../components/HomeScreen/EditBottomSheet';
import IcFolderFolder from '../assets/icons/folders/IcFolderFolder';

const HomeScreen = () => {
  const queryClient = useQueryClient();
  const sortRef = useRef(null);
  const [token, setToken] = useRecoilState(tokenState);
  const [user, setUser] = useRecoilState(userState);
  const [keyword, setKeyword] = useState('');
  const [focus, setFocus] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [sort, setSort] = useState('alphabet');
  const [openEdit, setOpenEdit] = useState({
    condition: false,
    data: {},
  });
  const [openAddLink, setOpenAddLink] = useState(false);
  const [openSelectFolder, setOpenSelectFolder] = useState(false);
  const [openSearchFolder, setOpenSearchFolder] = useState(false);
  const [createNewFolder, setCreateNewFolder] = useState(false);
  const [openChangeImage, setOpenChangeImage] = useState(false);
  const [folderImage, setFolderImage] = useState({
    IconComponent: IcFolderFolder,
    color: colors.folders.yellow,
    id: '',
  });
  const [openFinishSavingFolder, setOpenFinishSavingFolder] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);
  const [openTag, setOpenTag] = useState(false);
  const [imageChange, setImageChange] = useState(false);
  const [fixedKeyword, setFixedKeyword] = useState('');
  const [folders, setFolders] = useState([]);

  const updateUserState = async data => {
    setUser(user => ({
      ...user,
      isLogIn: true,
      id: data.id,
      nickname: data.nickname,
    }));
    setToken(data.data.accessToken);
    await AsyncStorage.setItem('@token', String(data.data.accessToken));
    queryClient.invalidateQueries('get-folders');
  };

  // 회원가입
  const { mutate: createUserMutate } = useMutation(createUser, {
    onSuccess: data => {
      console.log('회원가입 성공', data);
      updateUserState(data);
    },
    onError: error => {
      console.error('회원가입 실패', error);
    },
  });

  // 로그인
  const { mutate: signInMutate } = useMutation(signin, {
    onSuccess: data => {
      console.log('로그인 성공', data);
      updateUserState(data);
    },
    onError: error => {
      console.error('로그인 실패', error);
    },
  });

  const foldersQuery = useQuery(['get-folders'], () => getFolderForHome({ sort, token }), {
    enabled: token.length > 0 && user.isLogIn,
    onSuccess: data => {
      if (sort === 'alphabet') {
        setFolders(data.data);
      } else if (sort === 'newest') {
        setFolders([...data.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } else if (sort === 'oldest') {
        setFolders([...data.data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
      }
    },
    onError: err => console.log(err),
  });

  useEffect(() => {
    const signInOrSignUp = async () => {
      const deviceId = await AsyncStorage.getItem('@device-id');
      console.log('디바이스 ID:', deviceId);

      if (!deviceId) {
        const uuid = DeviceInfo.getUniqueId();
        await AsyncStorage.setItem('@device-id', String(uuid));
        createUserMutate({ id: uuid, nickname: null });
      } else {
        signInMutate({ id: deviceId });
      }
    };

    signInOrSignUp();
  }, []);

  useEffect(() => {
    if (token && user.isLogIn) {
      foldersQuery.refetch();
    }
  }, [user.isLogIn]);

  return (
    <Layout>
      <Header />
      <SearchBox
        focus={focus}
        keyword={keyword}
        onSetKeyword={setKeyword}
        onBlur={() => {
          setFocus(false);
          setFixedKeyword(keyword);
        }}
        onFocus={() => setFocus(true)}
        onIntializeKeyword={() => setKeyword('')}
      />
      {!keyword && !focus && (
        <FolderList
          onPressSort={() => {
            if (!openSort) {
              setOpenSort(true);
            } else {
              sortRef.current.close();

              setTimeout(() => {
                setOpenSort(false);
                foldersQuery.refetch();
              }, 1000);
            }
          }}
          sort={sort}
          onPressKebab={item => setOpenEdit({ condition: true, data: item })}
          folders={folders}
        />
      )}
      {!keyword && !focus && (
        <FloatingBox>
          <FloatingButton onPress={() => setOpenAddLink(true)}>
            <IcPlus />
            <FloatingButtonText>링크 추가하기</FloatingButtonText>
          </FloatingButton>
        </FloatingBox>
      )}
      {openSort && (
        <CommonShortBottomSheet
          ref={sortRef}
          onSetValue={text => {
            if (text === '가나다순') {
              setSort('alphabet');
            } else if (text === '최신순') {
              setSort('newest');
            } else if (text === '오래된순') {
              setSort('oldest');
            }
            foldersQuery.refetch();
          }}
          onClose={() => {
            sortRef.current.close();

            setTimeout(() => {
              setOpenSort(false);
            }, 1000);
          }}
          data={['가나다순', '최신순', '오래된순']}
        />
      )}
      {openEdit.condition && (
        <EditBottomSheet
          onClose={() => {
            setOpenEdit({ ...openEdit, condition: false });
            foldersQuery.refetch();
          }}
          detailData={openEdit.data}
        />
      )}
      {fixedKeyword && keyword && <SearchResults keyword={keyword} />}
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
          }}
          onNext={() => {
            setCreateNewFolder(false);
            setOpenSelectFolder(true);
            foldersQuery.refetch();
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
            foldersQuery.refetch();
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
        />
      )}

      {openFinish && (
        <AddTagBottomSheet
          fromHomeScreen={true}
          onPressClose={() => {
            setOpenFinish(false);
          }}
        />
      )}
    </Layout>
  );
};

export default HomeScreen;

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
