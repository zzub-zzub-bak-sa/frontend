import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Layout from '../components/layout/Layout';
import size from '../utils/size';
import IcBack from '../assets/icons/IcBack';
import { body1, body3, title3 } from '../styles/fonts';
import { colors } from '../styles/colors';

const data = `유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네 유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네유저는 어쩌고저쩌고 그래서 강산이\n\n1-1. 사용자의 권한\n유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네 유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네유저는 어쩌고저쩌고 그래서 강산이\n\n1-2. 정책\n유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네 유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네유저는 어쩌고저쩌고 그래서 강산이 푸르고 그렇습니다.네네네유저는 어쩌고저쩌고 그래서 강산이`;

const PolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <Layout>
      <Container>
        <Header onPress={() => navigation.navigate('Main')}>
          <IcBack size={24} color="white" />
          <Title>개인정보 처리방침</Title>
        </Header>
        <ScrollContent>
          <SubTitle>1. 소개</SubTitle>
          <Content>{data}</Content>
          <Space />
          <WithDrawBox>
            <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
              <WithDrawText>{'개인정보처리방침 >'}</WithDrawText>
            </TouchableOpacity>
          </WithDrawBox>
        </ScrollContent>
      </Container>
    </Layout>
  );
};

export default PolicyScreen;

const Container = styled(View)`
  padding: 0 ${size.width * 20}px;
`;

const Header = styled(TouchableOpacity)`
  height: ${size.height * 60}px;
  flex-direction: row;
  align-items: center;
  gap: ${size.width * 8}px;
  margin-top: ${size.height * 20}px;
`;

const ScrollContent = styled(ScrollView)`
  margin-top: ${size.height * 32.5}px;
`;

const Title = styled(Text)`
  font-family: ${title3.semibold.fontFamily};
  font-size: ${title3.semibold.fontSize}px;
  color: white;
`;

const SubTitle = styled(Text)`
  font-family: ${title3.bold.fontFamily};
  font-size: ${title3.bold.fontSize}px;
  color: white;
  margin-bottom: ${size.height * 20}px;
`;

const Content = styled(Text)`
  font-family: ${body1.medium.fontFamily};
  font-size: ${body1.medium.fontSize}px;
  color: white;
  line-height: ${size.height * 35.6}px;
`;

const WithDrawBox = styled(View)`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: ${size.height * 152}px;
`;

const WithDrawText = styled(Text)`
  font-family: ${body3.medium.fontFamily};
  font-size: ${body3.medium.fontSize}px;
  color: ${colors.grey[300]};
  text-align: center;
`;

const Space = styled(View)`
  height: ${size.height * 112}px;
  margin-bottom: ${size.height * 112}px;
`;
