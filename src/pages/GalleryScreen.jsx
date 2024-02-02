import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import Layout from '../components/layout/Layout';
import size from '../utils/size';
import IcBack from '../assets/icons/IcBack';
import { body2, caption1, title3 } from '../styles/fonts';
import IcSearch from '../assets/icons/IcSearch';
import IcArrowDown from '../assets/icons/IcArrowDown';
import { colors } from '../styles/colors';

const GalleryScreenjsx = () => {
  return (
    <Layout>
      <Header>
        <TitleBox>
          <IcBack size={24} color="white" />
          <Title>폴더제목 최대글자수 16자입</Title>
        </TitleBox>
        <TouchableOpacity>
          <Edit>편집</Edit>
        </TouchableOpacity>
      </Header>
      <Row>
        <TouchableOpacity>
          <IcSearch size={20} color="white" />
        </TouchableOpacity>
        <SortBox>
          <SortBoxText>정렬기준</SortBoxText>
          <IcArrowDown />
        </SortBox>
      </Row>
      <Grid>
        <FlatList
          data={Array(20).fill(0)}
          renderItem={({ _, idx }) => <ArticleBox index={idx} />}
          numColumns={3}
        />
      </Grid>
    </Layout>
  );
};

export default GalleryScreenjsx;

const Header = styled(View)`
  height: ${size.height * 60}px;
  padding: 0 ${size.width * 20}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const SortBox = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const SortBoxText = styled(Text)`
  font-family: ${caption1.semibold.fontFamily};
  font-size: ${caption1.semibold.fontSize}px;
  color: white;
`;

const Grid = styled(View)`
  padding: 0 ${size.width * 20}px;
`;

const ArticleBox = styled(TouchableOpacity)`
  width: ${size.width * 112}px;
  height: ${size.height * 112}px;
  border-radius: 16px;
  background-color: ${colors.bg[200]};
  margin-bottom: ${size.height * 7}px;
  margin-right: ${({ index }) => (index % 3 !== 1 ? size.width * 7 : 0)}px;
`;
