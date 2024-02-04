import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Layout from '../components/layout/Layout';
import size from '../utils/size';
import IcBack from '../assets/icons/IcBack';
import { body2, body3, subtitle1, title3 } from '../styles/fonts';
import { colors } from '../styles/colors';
import IcUser from '../assets/icons/IcUser';
import EditNicknameBottomSheet from '../components/MyPageScreen/EditNicknameBottomSheet';

const MyPageScreen = () => {
  const navigation = useNavigation();
  const [editNickname, setEditNickname] = useState(false);
  const [nickname, setNickname] = useState('');

  return (
    <Layout>
      <Header onPress={() => navigation.navigate('Main')}>
        <IcBack size={24} color="white" />
        <Title>마이페이지</Title>
      </Header>
      <UserBox>
        <IcUser size={32} color="white" />
        <View>
          <UserName>Username</UserName>
          <TouchableOpacity onPress={() => setEditNickname(true)}>
            <EditProfile>내 정보 수정</EditProfile>
          </TouchableOpacity>
        </View>
      </UserBox>
      <BinTextBox onPress={() => navigation.navigate('Trash')}>
        <BinText>휴지통</BinText>
      </BinTextBox>
      {editNickname && (
        <EditNicknameBottomSheet
          value={nickname}
          onChangeText={setNickname}
          onPressClose={() => setEditNickname(false)}
        />
      )}
      <PolicyBox>
        <TouchableOpacity onPress={() => navigation.navigate('Policy')}>
          <PolicyText>{'개인정보처리방침 >'}</PolicyText>
        </TouchableOpacity>
      </PolicyBox>
    </Layout>
  );
};

export default MyPageScreen;

const Header = styled(TouchableOpacity)`
  height: ${size.height * 60}px;
  padding: 0 ${size.width * 20}px;
  flex-direction: row;
  align-items: center;
  gap: ${size.width * 8}px;
  margin-bottom: ${size.height * 7}px;
  margin-top: ${size.height * 20}px;
`;

const Title = styled(Text)`
  font-family: ${title3.semibold.fontFamily};
  font-size: ${title3.semibold.fontSize}px;
  color: white;
`;

const UserBox = styled(View)`
  width: ${size.width * 350}px;
  height: ${size.width * 88}px;
  background-color: ${colors.bg[200]};
  border-radius: ${size.height * 12}px;
  margin: 0 ${size.width * 20}px ${size.height * 32}px;
  padding: ${size.height * 20}px ${size.width * 20}px;
  flex-direction: row;
  gap: ${size.width * 12}px;
  align-items: center;
`;

const UserName = styled(Text)`
  font-family: ${subtitle1.semibold.fontFamily};
  font-size: ${subtitle1.semibold.fontSize}px;
  color: white;
  line-height: ${size.height * 23.8}px;
  margin-bottom: ${size.height * 4}px;
`;

const EditProfile = styled(Text)`
  font-family: ${body2.medium.fontFamily};
  font-size: ${body2.medium.fontSize}px;
  color: ${colors.grey[300]};
  line-height: ${size.height * 24}px;
`;

const BinTextBox = styled(TouchableOpacity)`
  height: ${size.height * 56}px;
  padding: 0 ${size.width * 20}px;
  justify-content: center;
`;

const BinText = styled(Text)`
  font-family: ${subtitle1.semibold.fontFamily};
  font-size: ${subtitle1.semibold.fontSize}px;
  color: white;
`;

const PolicyBox = styled(View)`
  width: 100%;
  position: absolute;
  bottom: 68px;
`;

const PolicyText = styled(Text)`
  font-family: ${body3.medium.fontFamily};
  font-size: ${body3.medium.fontSize}px;
  color: ${colors.grey[300]};
  text-align: center;
`;
