import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components';
import size from '../utils/size';
import IcBack from '../assets/icons/IcBack';
import Layout from '../components/layout/Layout';
import { body2, subtitle1 } from '../styles/fonts';
import Tags from '../components/base/Tags';
import Instagram from '../assets/icons/Instagram';
import TagEditSelectBottomSheet from '../components/ContentScreen/TagEditSelectBottomSheet';

const ContentSceen = () => {
  const tags = ['해당 태그는', '만약길이가길면', '세번째는아래로'];
  const [openTagEdit, setOpenTagEdit] = useState(false);

  return (
    <Layout>
      <Header>
        <TitleBox>
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
      {openTagEdit && <TagEditSelectBottomSheet onClose={() => setOpenTagEdit(false)} />}
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
