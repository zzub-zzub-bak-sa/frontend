import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import size from '../utils/size';
import IcBack from '../assets/icons/IcBack';
import Layout from '../components/layout/Layout';
import { body2, subtitle1 } from '../styles/fonts';
import Tags from '../components/base/Tags';
import Instagram from '../assets/icons/Instagram';
import TagEditSelectBottomSheet from '../components/ContentScreen/TagEditSelectBottomSheet';
import TagEditBottomSheet from '../components/ContentScreen/TagEditBottomSheet';
import SearchFolder from '../components/share/Search/SearchFolder';
import CreateFolder from '../components/share/Create/CreateFolder';
import ChangeImage from '../components/share/Create/ChangeImage';
import ContentDeleteModal from '../components/ContentScreen/ContentDeleteModal';

const ContentSceen = () => {
  const tags = ['해당 태그는', '만약길이가길면', '세번째는아래로'];
  const [openTagEdit, setOpenTagEdit] = useState(false);
  const [selectEditOption, setSelectEditOption] = useState('');
  const [openFolder, setOpenFolder] = useState(false);
  const [createNewFolder, setCreateNewFolder] = useState(false);
  const [openChangeImage, setOpenChangeImage] = useState(false);
  const [folderImage, setFolderImage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const navigation = useNavigation();

  const handleSelectEditOption = option => {
    console.log(option);
    setSelectEditOption(option);
    console.log(selectEditOption);
    setOpenTagEdit(false);
  };

  return (
    <Layout>
      <Header>
        <TitleBox onPress={() => navigation.goBack()}>
          <IcBack size={24} color="white" />
        </TitleBox>
        <TouchableOpacity onPress={() => setOpenTagEdit(true)}>
          <Edit>편집</Edit>
        </TouchableOpacity>
      </Header>
      <ImageContainer>
        <ImageBox source={require('../assets/images/imageBox.png')} />
      </ImageContainer>
      <TagContainer>
        <TagBox>
          {tags.map((tag, idx) => (
            <Tags key={idx} text={tag} height={42} color="default" />
          ))}
        </TagBox>
      </TagContainer>
      <GoSnsContainer>
        <SnsContainer>
          <Instagram size={24} />
        </SnsContainer>
        <GoSns>
          <GoSnsText>SNS에서 보기 ></GoSnsText>
        </GoSns>
      </GoSnsContainer>
      {openTagEdit && (
        <TagEditSelectBottomSheet
          onClose={() => setOpenTagEdit(false)}
          onSelectOption={handleSelectEditOption}
        />
      )}
      {selectEditOption === '태그 편집' && (
        <TagEditBottomSheet onClose={() => setSelectEditOption('')} />
      )}
      {selectEditOption === '이동' && (
        <SearchFolder
          data={[]}
          onClose={() => setSelectEditOption('')}
          onPressNewFolder={() => {
            setOpenFolder(false);
            setCreateNewFolder(true);
          }}
        />
      )}
      {createNewFolder && (
        <CreateFolder
          placeholder="폴더의 이름을 지어주세요."
          onClose={() => {
            setCreateNewFolder(false);
            setSelectEditOption(false);
          }}
          onBack={() => {
            setCreateNewFolder(false);
            setOpenFolder(true);
          }}
          onChangeImage={() => {
            setOpenChangeImage(true);
          }}
          onFolderCreationSuccess={() => {
            navigation.navigate('Gallery', { showToast: true });
            setShowToast(true);
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
      {selectEditOption === '삭제' && (
        <ContentDeleteModal onClose={() => setSelectEditOption('')} />
      )}
    </Layout>
  );
};

export default ContentSceen;

const Header = styled(View)`
  height: ${size.height * 60}px;
  padding: 0 ${size.width * 20}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TitleBox = styled(TouchableOpacity)`
  flex-direction: row;
  gap: ${size.width * 8}px;
  margin-left: ${size.width * -4}px;
`;

const Edit = styled(Text)`
  font-family: ${body2.medium.fontFamily};
  font-size: ${body2.medium.fontSize}px;
  color: white;
`;

const ImageContainer = styled(View)``;

const ImageBox = styled(Image)`
  width: ${size.width * 390}px;
  height: ${size.height * 390}px;
`;

const TagContainer = styled(View)`
  padding: ${size.width * 20}px;
`;

const TagBox = styled(View)`
  flex-direction: row;
  gap: ${size.width * 11}px;
  flex-wrap: wrap;
`;

const GoSnsContainer = styled(TouchableOpacity)`
  flex-direction: row;
  gap: ${size.width * 10}px;
  justify-content: flex-end;
  align-items: center;
  margin-right: ${size.width * 20}px;
  margin-top: ${size.height * 100}px;
`;

const SnsContainer = styled(View)`
  width: ${size.width * 32}px;
  height: ${size.height * 32}px;
  background-color: white;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  padding: ${size.width * 4}px;
`;

const GoSns = styled(TouchableOpacity)``;

const GoSnsText = styled(Text)`
  color: white;
  font-family: ${subtitle1.semibold.fontFamily};
  font-size: ${subtitle1.semibold.fontSize}px;
  align-items: center;
`;
