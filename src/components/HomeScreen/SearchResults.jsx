import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import size from '../../utils/size';
import { body2 } from '../../styles/fonts';
import { colors } from '../../styles/colors';
import FolderCard from './FolderCard';
import TagCard from './TagCard';
import NoResult from './NoResult';

const SearchResults = ({ data }) => {
  return (
    <ScrollView>
      {data ? (
        <>
          <View>
            <CategoryBox>
              <Category>폴더</Category>
              <FolderCount>000건</FolderCount>
            </CategoryBox>
            {['홍대 데이트', '혼밥 홍대', '홍대 핫플'].map(el => (
              <FolderCard key={el} title={el} />
            ))}
            <SeeMore>
              <SeeMoreText>더보기</SeeMoreText>
            </SeeMore>
            <Divider />
          </View>
          <View>
            <CategoryBox>
              <Category>태그</Category>
              <FolderCount>000건</FolderCount>
            </CategoryBox>
            {['홍대', '홍대밥집', '홍대양식'].map(el => (
              <TagCard key={el} tag={el} />
            ))}
            <SeeMore>
              <SeeMoreText>더보기</SeeMoreText>
            </SeeMore>
            <Divider />
          </View>
        </>
      ) : (
        <NoResult />
      )}
    </ScrollView>
  );
};

export default SearchResults;

const CategoryBox = styled(View)`
  height: ${size.height * 52}px;
  padding: 0 ${size.width * 20}px;
  flex-direction: row;
  align-items: center;
  gap: ${size.width * 8}px;
`;

const Category = styled(Text)`
  font-family: ${body2.medium.fontFamily};
  font-size: ${body2.medium.fontSize}px;
  color: ${colors.grey[400]};
`;

const FolderCount = styled(Text)`
  font-family: ${body2.medium.fontFamily};
  font-size: ${body2.medium.fontSize}px;
  color: ${colors.grey[300]};
`;

const SeeMore = styled(TouchableOpacity)`
  height: ${size.height * 56}px;
  align-items: center;
  justify-content: center;
  border-top-width: 0.4px;
  border-top-color: ${colors.grey[200]};
`;

const SeeMoreText = styled(Text)`
  font-family: ${body2.medium.fontFamily};
  font-size: ${body2.medium.fontSize}px;
  color: ${colors.grey[300]};
`;

export const Divider = styled(View)`
  height: ${size.height * 12}px;
  background-color: ${colors.black};
`;
