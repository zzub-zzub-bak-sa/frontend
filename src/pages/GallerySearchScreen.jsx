import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Layout from '../components/layout/Layout';
import size from '../utils/size';
import { colors } from '../styles/colors';
import { WIDTH } from '../constants/constants';
import { body1 } from '../styles/fonts';
import IcSearch from '../assets/icons/IcSearch';
import IcClearCircle from '../assets/icons/IcClearCircle';
import Tags from '../components/base/Tags';
import Grid from '../components/GalleryScreen/Grid';
import { Divider } from '../components/HomeScreen/SearchResults';
import NoResult from '../components/HomeScreen/NoResult';

const GallerySearchScreen = () => {
  const [keyword, setKeyword] = useState('');
  const [focus, setFocus] = useState(false);
  const tags = ['태그', '태그', '태그', '태그', '태그', '태그길이가최대', '7자', '공백포함'];
  const [written, setWritten] = useState([]);
  const data = null;

  return (
    <>
      <Layout>
        <Content>
          <InputWrapper>
            <InputBox focus={focus}>
              <IcSearch />
              {written.length <= 3 && (
                <Input
                  placeholder="최대 3개의 태그를 함께 검색할 수 있어요."
                  placeholderTextColor={colors.grey[200]}
                  value={keyword}
                  onChangeText={text => setKeyword(text)}
                  onFocus={() => setFocus(true)}
                  onEndEditing={e => {
                    setWritten([...written, e.nativeEvent.text]);
                    setFocus(false);
                  }}
                  notEditing={focus && keyword}
                  maxLength={7}
                />
              )}
              {keyword && focus && (
                <TouchableOpacity onPress={() => setKeyword('')}>
                  <IcClearCircle />
                </TouchableOpacity>
              )}
            </InputBox>
          </InputWrapper>
          {!keyword && focus && (
            <RecommendTags>
              <Title>폴더에 등록된 태그</Title>
              <View>
                <TagBox>
                  {tags.map((tag, idx) => (
                    <Tags key={idx} text={tag} height={42} color="default" />
                  ))}
                </TagBox>
              </View>
            </RecommendTags>
          )}
          {keyword && !focus && (
            <WrittenTags>
              {written.map((el, index) => (
                <Tags
                  key={index}
                  text={el}
                  color="default"
                  isEditPossible
                  onPressTag={() => setWritten(written.filter(t => t !== el))}
                />
              ))}
            </WrittenTags>
          )}
        </Content>

        {keyword && !focus && data && (
          <ScrollView>
            <Grid />
          </ScrollView>
        )}
        {!focus && keyword && !data && (
          <ScrollView>
            <NoResultWrapper>
              <NoResult />
            </NoResultWrapper>
            <Divider />
            <View style={{ marginVertical: size.height * 24, paddingLeft: size.width * 20 }}>
              <Title>태그가 등록되지 않은 링크</Title>
            </View>
            <Grid />
          </ScrollView>
        )}
      </Layout>

      {keyword && focus && (
        <SearchDropDown>
          {['양고기', '수우미양가', '양식 맛있겠다'].map(name => (
            <MatchedTagsBox key={name}>
              <MatchedTagsText>{name}</MatchedTagsText>
            </MatchedTagsBox>
          ))}
        </SearchDropDown>
      )}
    </>
  );
};

export default GallerySearchScreen;

const Content = styled(View)`
  padding: 0 ${size.width * 24}px;
  margin-top: ${size.height * 20}px;
`;

const InputWrapper = styled(View)`
  height: ${size.height * 72}px;
  justify-content: center;
`;

const InputBox = styled(View)`
  flex-direction: row;
  gap: ${size.width * 16}px;
  padding-bottom: ${size.height * 13}px;
  border-bottom-color: ${({ focus }) => (focus ? colors.orange : 'white')};
  border-bottom-width: 1px;
  align-items: center;
  margin-top: ${size.height * 20}px;
`;

const Input = styled(TextInput)`
  width: ${({ notEditing }) => (!notEditing ? size.width * WIDTH : size.width * (WIDTH - 125))}px;
  font-family: ${body1.medium.fontFamily};
  font-size: ${body1.medium.fontSize}px;
  color: white;
`;

const Title = styled(Text)`
  font-family: ${body1.medium.fontFamily};
  font-size: ${body1.medium.fontSize}px;
  color: white;
  margin-bottom: ${size.height * 8}px;
`;

const TagBox = styled(View)`
  flex-direction: row;
  gap: ${size.width * 11}px;
  flex-wrap: wrap;
`;

const SearchDropDown = styled(View)`
  height: ${size.height * 155}px;
  border-radius: 0 0 12px 12px;
  background-color: ${colors.grey[100]};
  padding: 0 ${size.width * 20}px;
  padding-top: ${size.height * 5}px;
  position: absolute;
  left: ${size.width * 23}px;
  right: ${size.width * 23}px;
  top: ${size.height * 114}px;
`;

const MatchedTagsBox = styled(View)`
  padding: ${size.height * 10}px 0;
`;

const MatchedTagsText = styled(Text)`
  font-family: ${body1.medium.fontFamily};
  font-size: ${size.width * body1.medium.fontSize}px;
  color: white;
`;

const WrittenTags = styled(View)`
  flex-direction: row;
  gap: ${size.width * 8}px;
  margin-top: ${size.height * 17}px;
  margin-bottom: ${size.height * 40}px;
`;

const RecommendTags = styled(View)`
  margin-top: ${size.height * 41}px;
`;

const GridWrapper = styled(View)`
  margin-bottom: ${size.height * 24}px;
`;

const NoResultWrapper = styled(View)`
  height: ${size.height * 158 * 1.5}px;
  justify-content: center;
  align-items: center;
`;
