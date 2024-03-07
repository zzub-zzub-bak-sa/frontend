/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
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
import { getSearchPosts } from '../api/apis/posts';
import { tokenState } from '../store/store';
import { getTagsByFolderId } from '../api/apis/tags';

const GallerySearchScreen = ({ navigation, route }) => {
  const token = useRecoilValue(tokenState);
  const folderId = route.params.id;
  const [keyword, setKeyword] = useState('');
  const [focus, setFocus] = useState(false);
  const [tags, setTags] = useState([]);
  const [written, setWritten] = useState([]);
  const [data, setData] = useState([]);

  const { mutate, isLoading, refetch } = useMutation(getSearchPosts, {
    onSuccess: data => {
      if (!isLoading && (!data || !data.data)) {
        refetch();
      }

      if (data.success) {
        console.log(data.data);
        setData(data.data);
      }
    },
  });

  useQuery(['get-tags', folderId], () => getTagsByFolderId({ folderId, token }), {
    onSuccess: data => {
      setTags(data.data);
    },
  });

  useEffect(() => {
    if (written.length > 0) {
      fetchData(written);
    }

    if (!written) {
      setData([]);
    }
  }, [written]);

  const countMatches = tag => {
    const match = tag.match(new RegExp(keyword, 'gi'));
    return match ? match.length : 0;
  };

  const fetchData = newData => {
    mutate({
      tags: newData,
      folderId: route.params?.id,
      sort: 'newest',
      token,
    });
  };

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
                  onEndEditing={() => {
                    if (keyword) {
                      const newData = written.concat(keyword);
                      fetchData(newData);
                      setKeyword('');
                      setWritten(newData);
                    }

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
                  {tags.map(tag => (
                    <Tags key={tag} text={tag} height={42} color="default" />
                  ))}
                </TagBox>
              </View>
            </RecommendTags>
          )}
          {!focus && (
            <WrittenTags>
              {written.map(el => (
                <Tags
                  key={el}
                  text={el}
                  color="default"
                  isEditPossible
                  onDelete={() => {
                    console.log(written);
                    setWritten(written.filter(t => t !== el));
                    console.log(written);
                  }}
                />
              ))}
            </WrittenTags>
          )}
        </Content>

        {!focus && written && (
          <ScrollView>
            {data ? (
              <Grid data={data} />
            ) : (
              <>
                <NoResultWrapper>
                  <NoResult />
                </NoResultWrapper>
                <Divider />
                <View style={{ marginVertical: size.height * 24, paddingLeft: size.width * 20 }}>
                  <Title>태그가 등록되지 않은 링크</Title>
                </View>
                <Grid />
              </>
            )}
          </ScrollView>
        )}
      </Layout>

      {keyword && focus && (
        <SearchDropDown>
          {tags
            .sort((a, b) => countMatches(b) - countMatches(a))
            .map(tag => {
              const parts = tag.split(new RegExp(`(${keyword})`, 'gi'));
              return (
                <MatchedTagsBox key={tag}>
                  <MatchedTagsText>
                    {parts.map((part, index) =>
                      part.toLowerCase() === keyword.toLowerCase() ? (
                        <Text key={part + String(index)} style={{ color: colors.orange }}>
                          {part}
                        </Text>
                      ) : (
                        part
                      ),
                    )}
                  </MatchedTagsText>
                </MatchedTagsBox>
              );
            })}
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

const NoResultWrapper = styled(View)`
  height: ${size.height * 158 * 1.5}px;
  justify-content: center;
  align-items: center;
`;
